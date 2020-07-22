import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, Label, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import {Control, Errors, LocalForm} from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';

const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

    class CommentForm extends Component {
        constructor(props) {
            super(props);

            this.state = {
                isModalOpen: false
            };
            this.toggleModal = this.toggleModal.bind(this);
        }

        toggleModal() {
            this.setState({
                isModalOpen: !this.state.isModalOpen
            });
        }

        handleSubmit(values) {
            console.log('Current State is: ' + JSON.stringify(values));
            alert('Current State is: ' + JSON.stringify(values));
            this.toggleModal();
            this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
        }

        render() {
            return (
                <React.Fragment>
                    <div className="col-12">
                        <button onClick={this.toggleModal} type="button" className="btn btn-outline-secondary"><i className="fa fa-pencil fa-lg"></i> Submit Comment</button>
                    </div>
                    <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                        <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                        <ModalBody>
                            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                                <Row className="form-group">
                                    <Col md={12}>
                                        <Label htmlFor="rating">Rating</Label>
                                        <Control.select model=".rating" name="rating" className="form-control">
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                        </Control.select>
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Col md={12}>
                                        <Label htmlFor="name">Your Name</Label>
                                    </Col>
                                    <Col md={12}>
                                        <Control.text model=".author" id="author" name="author" 
                                            placeholder="Your Name"
                                            className="form-control"
                                            innerRef={(input) => this.name = input}
                                            validators={{
                                                minLength: minLength(3), maxLength: maxLength(15)
                                            }}/>
                                        <Errors
                                            className="text-danger"
                                            model=".author"
                                            show="touched"
                                            messages={{
                                                minLength: 'Must be greater than 2 characters',
                                                maxLength: 'Must be 15 characters or less'
                                            }}
                                        />
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Col md={12}>
                                        <Label htmlFor="comment">Comment</Label>
                                        <Control.textarea model=".comment" id="comment" name="comment" rows="6" className="form-control"/>
                                    </Col>
                                </Row>
                                <Button type="submit" value="submit" color="primary">Submit</Button>
                            </LocalForm>
                        </ModalBody>
                    </Modal>
                </React.Fragment>
            );
        }
    }

    function RenderDish({dish}) {
        if (dish != null)
            return (
                <Card>
                    <CardImg top src={baseUrl + dish.image} alt={dish.name} />
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

    function RenderComments({comments, addComment, dishId}) {
        if (comments != null) {
                return (
                    <div>
                        <h4>Comments</h4>
                        {comments.map((comment) => {
                            //const date = new Intl.DateTimeFormat('en-US').format(new Date(comment.date));
                            const date = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)));
                            return (
                                <ul>
                                    <li>
                                        {comment.comment}<br/>
                                        -- {comment.author},{date}
                                    </li>
                                </ul>
                            );                        
                        })}
                        <CommentForm dishId={dishId} addComment={addComment} />
                    </div>
                );
            } 
        else{
            return (
                <div></div>
            );
        }
    }

    const  DishDetail = (props) => {
        if (props.isLoading) {
            return(
                <div className="container">
                    <div className="row">            
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (props.errMess) {
            return(
                <div className="container">
                    <div className="row">            
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            );
        }
        else if (props.dish != null)
            return (
                <div className="container">
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>{props.dish.name}</h3>
                            <hr />
                        </div>                
                    </div>
                    <div className="row">
                        <div className="col-12 col-md-5 m-1">
                            <RenderDish dish={props.dish} />
                        </div>
                        <div className="col-12 col-md-5 m-1">
                        <RenderComments comments={props.comments}
                            addComment={props.addComment}
                            dishId={props.dish.id}
                        />
                        </div>
                    </div>
                </div>
            );
    }

export default DishDetail;