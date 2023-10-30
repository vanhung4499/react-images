import {useCallback, useRef, useState} from "react";
import useDebounce from "../hooks/useDebounce.js";
import useFetchPhoto from "../hooks/useFetchPhoto.js";
import {Container, Form, Row, Spinner} from "react-bootstrap";
import Photo from "./photo.jsx";

function Gallery() {
    const [searchText, setSearchText] = useState("")
    const [currentPage, setCurrentPage] = useState(1);
    const debounceQuery = useDebounce(searchText, 500);
    const { loading, photos, hasMore } = useFetchPhoto(debounceQuery, currentPage);

    const observer = useRef();
    const lastElementRef = useCallback(
        (node) => {
            if (loading) return;
            if (observer.current) observer.current.disconnect();
            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasMore) {
                    setCurrentPage((prev) => prev + 1);
                }
            });
            if (node) observer.current.observe(node);
        },
        [loading, hasMore]
    );

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <Container className="py-2">
            <Row>
                <Form className="mx-auto mt-2 mb-3 search-input" onSubmit={handleSubmit}>
                    <Form.Control
                        type="search"
                        placeholder="Search Image"
                        className="me-2"
                        aria-label="Search"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                </Form>
            </Row>
            <Row>
                {photos.length > 0 &&
                    photos.map((photo, index) => {
                        if (photos.length === index + 1) {
                            return <Photo ref={lastElementRef} key={index} data={photo} />;
                        } else {
                            return <Photo key={index} data={photo} />;
                        }
                    })}
                {loading && (
                    <div className="">
                        <Spinner animation="border" size="md" />
                    </div>
                )}
            </Row>
        </Container>
    );
}

export default Gallery;
