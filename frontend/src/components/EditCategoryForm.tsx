import { useForm, useFieldArray, Controller } from "react-hook-form";
import {
  Box,
  Button,
  Stack,
  TextField,
  IconButton,
  MenuItem,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import type { FilmDto } from "../shared/api/cinemaShowcaseApi";
import type { ActiveCategory } from "../shared/types";
import { v4 as uuidv4 } from 'uuid';

const SubCategoryBlock = ({ control, register, subIdx, removeSub, films, getValues}) => {

  const {
    fields: filmIdFields,
    append: appendFilm,
    remove: removeFilm,
  } = useFieldArray({
    control,
    name: `subCategories.${subIdx}.filmIds`,
  });
const currentSelectedFilms = getValues(`subCategories.${subIdx}.filmIds`);
  return (
    <Box sx={{ border: "1px solid #ccc", p: 2, mb: 2 }}>
       <Stack direction="column" gap={2}>
        <Stack direction="row">
          <TextField
            label="Подкатегория"
            {...register(`subCategories.${subIdx}.name`, { required: true})}
          />
          <IconButton onClick={() => removeSub(subIdx)}>
            <DeleteIcon />
          </IconButton>
        </Stack>

     
        {filmIdFields.map((field, idx) => (
          <Controller
            key={field.id}
            control={control}
            name={`subCategories.${subIdx}.filmIds.${idx}`}
            render={({ field }) => (
              <Stack direction="column" gap={0}><Stack direction="row">
                <TextField select={field.value==0} disabled={field.value!==0} {...field} value={films.find(f =>f.id == field.value)?.name} size="small" fullWidth>
                  {field.value==0 && films.filter(film=> !currentSelectedFilms.includes(film.id)).map(f => (
                    <MenuItem key={f.id} value={f.id} >{f.name}</MenuItem>
                  ))}
                </TextField>
                  <IconButton onClick={() => {
                    removeFilm(idx)
                  }}>
                    <DeleteIcon />
                  </IconButton>
              </Stack>
              </Stack>
            )}
          />
        ))}
      </Stack>

      <Button onClick={() => appendFilm(0)}>Добавить фильм</Button>
    </Box>
  );
};


type EditCategoryFormProps = {
  category: ActiveCategory
  films: FilmDto[];
  onSubmit: (data: ActiveCategory) => void;
}
export const EditCategoryForm = ({ category, films, onSubmit }: EditCategoryFormProps) => {
  const { control, handleSubmit, register, getValues } = useForm<ActiveCategory>({
    defaultValues: category,
  });

  const {
    fields: subCategories,
    append: appendSub,
    remove: removeSub,
  } = useFieldArray({
    control,
    name: "subCategories",
  });

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ p: 2 }}>
      <TextField
        label="Название категории"
        fullWidth
        {...register("name", { required: true })}
        sx={{ mb: 2 }}
      />

      {subCategories.map((sub, subIdx) => {
        return <SubCategoryBlock
          getValues={getValues}
          key={subIdx}
          control={control}
          register={register}
          subIdx={subIdx}
          removeSub={removeSub}
          films={films}
        />
      })}

      <Button
        variant="outlined"
        startIcon={<AddIcon />}
        onClick={() => appendSub({ id: uuidv4(), name: "", filmIds: [] })}
        sx={{ mb: 2 }}
      >
        Добавить подкатегорию
      </Button>

      <Button type="submit" variant="contained" fullWidth>
        Сохранить категорию
      </Button>
    </Box>
  );
}

