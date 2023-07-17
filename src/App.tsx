import {useLoaderData} from "react-router";
import {Button, Card, Col, Container, Grid, Row, Text} from "@nextui-org/react";
import {ChangeEvent, useEffect, useState} from "react";


function App() {

    const [search , setsearch] = useState<string>("fruit")

    const [page, setPage] = useState(1);

    const {info: {results}} = useLoaderData();


    const [photos, setPhotos] = useState(results);



    useEffect(() => {
        // Add event listener to track scrolling
        window.addEventListener('scroll', handleScroll);

        // Clean up event listener on component unmount
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);


    useEffect(() => {
        // Fetch new photos when the page value changes

        page !== 1 && fetchPhotos();


    }, [page]);


    console.log(page)



    const handleScroll = () => {
        // Check if the user has reached the bottom of the page
        if (window.innerHeight + window.scrollY >= document.body.scrollHeight) {
            // Increment the page value to fetch new photos
            setPage(prevPage => prevPage + 1);
        }
    };

    const fetchPhotos = async () => {
        try {
            // Fetch photos data
            const response = await fetch(
                `https://api.unsplash.com/search/photos?page=${page}&query=nature`,
                {
                    headers: {
                        Authorization: 'Client-ID GeuDO0N3Nbf0t1I9a0wiFPtVimKQqltFP19TEI0xBj4', // Replace with your actual access key
                    },
                }
            );

            const data = await response.json();
            setPhotos(prevPhotos => [...prevPhotos, ...data.results]);

        } catch (error) {
            console.log(error);
        }
    };





    const render = photos.map((_, i) => {

        return (
            <Grid  key={_.id} xs={5}>

                <Card>

                    <Card.Header css={{position: "absolute", zIndex: 1, top: 5}}>
                        <Col>
                            <Text weight={"bold"}  color="black" css={{whiteSpace : "nowrap" ,  overflow: "hidden"  , textOverflow : "ellipsis" , width : 150 }}>
                                {_.alt_description}
                            </Text>
                        </Col>
                    </Card.Header>

                    <Card.Body css={{p: 0 , background : _.color}}>

                        <Card.Image
                            showSkeleton={false}
                            src={_.urls.regular}
                            width="100%"
                            height="100%"
                            objectFit="cover"
                            alt="Card example background"
                            css={{background : _.color}}
                        />
                    </Card.Body>


                    <Card.Footer
                        isBlurred
                        css={{
                            position: "absolute",
                            bgBlur: "#ffffff66",
                            borderTop: "$borderWeights$light solid rgba(255, 255, 255, 0.2)",
                            bottom: 0,
                            zIndex: 1,
                        }}
                    >
                        <Row justify={"center"}>
                            <Col>

                                    <Button flat auto rounded color="secondary">
                                        <Text
                                            css={{color: "inherit"}}
                                            size={10}
                                            weight="bold"
                                            transform="uppercase"
                                        >
                                            Notify Me
                                        </Text>
                                    </Button>

                            </Col>
                        </Row>

                    </Card.Footer>
                </Card>
            </Grid>
        )

    })


    return (
        <Container xs>
            <select onChange={(e) => setsearch(e.target.value)}>
                <option value={"fruit"}>fruit</option>
                <option value={"pop"}>pop</option>
                <option value={"color"}>color</option>
                <option value={"singers"}>singers</option>
            </select>
            <Grid.Container gap={1} justify="center" css={{gridTemplateColumns : "repeat(auto-fit, minmax(300px, 1fr))"}}>
                {render}
            </Grid.Container>
        </Container>
    )
}

export default App
