import React, {useState} from 'react';
import {
    Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, Collapse, IconButton, IconButtonProps, styled,
} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {red} from "@mui/material/colors";
import CocktailCardDetail from "../CocktailCardDetail/CocktailCardDetail";
import "./CocktailCard.css"

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
    const {expand, ...other} = props;
    return <IconButton {...other} />;
})(({theme, expand}) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.complex,
    }),
}));

export default function CocktailCard({name, imgUrl, type, drinkId}: { name: string, imgUrl: string, type: string, drinkId: string }) {
    const [expanded, setExpanded] = useState<boolean>(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <div className="cocktail-card" data-testid={"cocktail-card-" + drinkId}>
            <Card sx={{width: 300}}>
                <CardHeader
                    avatar={
                        <Avatar sx={{bgcolor: red[500]}} aria-label="recipe">
                            {type.charAt(0)}
                        </Avatar>
                    }
                    title={name}
                    subheader={type}
                />
                <CardMedia
                    component="img"
                    height="194"
                    image={imgUrl}
                    alt={name}
                />
                <CardContent>
                </CardContent>
                <CardActions disableSpacing>
                    <ExpandMore
                        data-testid={"expand-button-" + drinkId}
                        expand={expanded}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                        id={"expand-btn-" + drinkId}
                    >
                        <ExpandMoreIcon/>
                    </ExpandMore>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <CocktailCardDetail key={drinkId} drinkId={drinkId}/>
                    </CardContent>
                </Collapse>
            </Card>
        </div>
    )
}


