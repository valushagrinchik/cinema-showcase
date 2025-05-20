import { Box, List, ListItem, ListItemText } from "@mui/material"

type FilmsListProps = {
    films: Record<number, string>
    filmIds: number[]
    subCatId: number
}

export const FilmsList = ({ films, filmIds, subCatId }: FilmsListProps) => {
    return filmIds.length > 0 &&
        <Box sx={{ pl: 4 }}>
            <List>
                {
                    filmIds.map((filmId) =>
                        <ListItem key={'modal_' + subCatId + '_' + filmId}>
                            <ListItemText primary={films[filmId]} />
                        </ListItem>
                    )
                }
            </List>
        </Box>
}