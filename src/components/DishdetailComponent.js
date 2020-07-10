import React from 'react';
import {Card, CardBody, CardImg, CardText, CardTitle} from "reactstrap";

    function RenderDish({dish}) {
        if (dish != null)
            return (
                <Card>
                    <CardImg top src={dish.image} alt={dish.name}/>
                    <CardBody>
                        <CardTitle><b>{dish.name}</b></CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            );
        else
            return (
                <div></div>
            );
    }

    function RenderComments({dish}) {
        if (dish != null) {
            const comments = dish.comments.map((comment) => {
                //const date = new Intl.DateTimeFormat('en-US').format(new Date(comment.date));
                const date = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)));
                return (
                    <div>
                        {comment.comment}<br/>
                        -- {comment.author},{date}<br/><br/>
                    </div>
                );
            });
            return (
                <div>
                    <h4>Comments</h4>
                    {comments}
                </div>
            );
        } else
            return (
                <div></div>
            );
    }

    const  DishDetail = (props) => {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={props.dish}/>
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <RenderComments dish={props.dish}/>
                    </div>
                </div>
            </div>
        );
    }

export default DishDetail;