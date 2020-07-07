import React, {Component} from 'react';
import {Card, CardBody, CardImg, CardText, CardTitle} from "reactstrap";

class DishDetail extends Component {

    static renderDish(dish) {
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

    static renderComments(dish) {
        if (dish != null) {
            const comments = dish.comments.map((comment) => {
                const date = new Intl.DateTimeFormat('en-US').format(new Date(comment.date));
                return (<div>
                        {comment.comment}<br/><br/>
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

    render() {
        return (
            <div className="row">
                <div className="col-12 col-md-5 m-1">
                    {DishDetail.renderDish(this.props.selectedDish)}
                </div>
                <div className="col-12 col-md-5 m-1">
                    {DishDetail.renderComments(this.props.selectedDish)}
                </div>
            </div>
        );
    }
}

export default DishDetail;