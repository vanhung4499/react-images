import React from "react";
import { Card, Col } from "react-bootstrap";

const Photo = React.forwardRef(({ data }, ref) => {
    return (
        <Col sm={6} md={3} lg={2} className="my-3">
            <div ref={ref}>
                <Card>
                    <Card.Img variant="top" src={data?.src.small} />
                </Card>
            </div>
        </Col>
    );
});

export default Photo;
