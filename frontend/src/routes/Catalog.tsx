import axios from 'axios';
import { useEffect, useState } from 'react';
import { categoriesURL, filmsURL } from "../shared/constants";
import List from "@mui/material/List";
import type { CategoriesDto, CategoriesUpdateDto, FilmDto, FilmsDto, SubCategoryDto } from "../shared/api/cinemaShowcaseApi";
import { Box, ListItemText, ListItemIcon, Button, Stack, ListItem, IconButton } from "@mui/material";
import CategoryIcon from '@mui/icons-material/Category';
import EditIcon from '@mui/icons-material/Edit';
import { EditCategoryForm } from '../components/EditCategoryForm';
import { FilmsList } from '../components/FilmsList';
import { Modal } from '../components/Modal';
import type { ActiveCategory } from '../shared/types';
import { getCategoryDiff } from '../shared/utils/diffCategories';
import { v4 as uuidv4 } from 'uuid';

export default function Catalog() {
  const [active, setActive] = useState<ActiveCategory>();

  const [initialCategories, setInitialCategories] = useState<ActiveCategory[]>([]);
  const [categories, setCategories] = useState<ActiveCategory[]>([]);
  const [films, setFilms] = useState<FilmDto[]>([]);

  useEffect(() => {
    axios.get<CategoriesDto>(categoriesURL)
      .then(res => {
        setCategories(res.data.data)
        setInitialCategories(JSON.parse(JSON.stringify(res.data.data)))
      })
      .catch(err => console.error(err));

    axios.get<FilmsDto>(filmsURL)
      .then(res => setFilms(res.data.data))
      .catch(err => console.error(err));
  }, []);


   const saveCategories = async (data: CategoriesUpdateDto) => {
    axios.put(categoriesURL, data).then(res => console.log(res))
      .catch(err => console.error(err));
  }

  const handleSaveToServer = async () => {
    const diff = getCategoryDiff(initialCategories, categories);
    await saveCategories(diff);
    setInitialCategories(JSON.parse(JSON.stringify(categories)))
  };

  const renderSubCategories = (subCategories: SubCategoryDto[]) => {
    return subCategories.length > 0 &&
      <Box sx={{ pl: 4 }}>
        <List>
          {subCategories.map(subcat =>
            <Box key={subcat.id}>
              <ListItem>
                <ListItemIcon>
                  <CategoryIcon />
                </ListItemIcon>
                <ListItemText primary={subcat.name} />
              </ListItem>
              <FilmsList films={Object.fromEntries(films.map(film => ([film.id, film.name])))} filmIds={subcat.filmIds} subCatId={subcat.id}/>
            </Box>
          )}
        </List>
      </Box>
  }

  
  return <Stack direction="column" spacing={2}>
    <Stack direction="row" spacing={2} justifyContent="space-between">
      <Button variant="contained" onClick={()=>setActive({id: uuidv4(), name: '', subCategories: []})}>Добавить категорию</Button>
      <Button variant="contained" onClick={handleSaveToServer}>Сохранить на сервер</Button>
    </Stack>
    <List>
      {categories.map(cat =>
        <Box key={cat.id}>
          <ListItem secondaryAction={
            <IconButton edge="end" aria-label="edit" onClick={() => {
              setActive(cat)
            }}>
              <EditIcon />
            </IconButton>
          }>
            <ListItemIcon>
              <CategoryIcon />
            </ListItemIcon>
            <ListItemText primary={cat.name} />
          </ListItem>
          {renderSubCategories(cat.subCategories)}
        </Box>
      )}
    </List>
    {active && 
      <Modal open={!!active} setOpen={() => setActive(undefined)}>
        <EditCategoryForm films={films} category={active} onSubmit={(data: ActiveCategory) => {
         const existed = categories.find(cat=>cat.id == data.id)
          if(!existed){
            setCategories([...categories, data])
          } else {
            setCategories(categories.map(cat => cat.id == data.id ? data : cat))
          }
          setActive(undefined)
        }} />
      </Modal>
    }
  </Stack>
}


