import {Container, LinearProgress, Typography} from "@material-ui/core";
import React from "react";

export default function Loading() {
    return (
        <Container maxWidth={'xs'}>
            <Typography variant={'h4'} gutterBottom>Loading....</Typography>
            <LinearProgress/>
        </Container>
    )
}