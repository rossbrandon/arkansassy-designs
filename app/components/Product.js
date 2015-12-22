import React from 'react'
import Rebase from 're-base'
import Comments from './Comments/Comments'

const base = Rebase.createClass('https://react-note.firebaseio.com/')

class Product extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            comments: []
        }
    }

    componentDidMount() {
        this.init(this.props.params.productName)
    }

    componentWillReceiveProps(nextProps) {
        base.removeBinding(this.ref)
        this.init(nextProps.params.productName)
    }

    componentWillUnmount() {
        base.removeBinding(this.ref)
    }

    init(productName) {
        this.ref = base.bindToState(this.props.params.productName, {
            context: this,
            asArray: true,
            state: 'comments'
        })
    }

    handleAddComment(newComment) {
        console.log(newComment)
        base.post(this.props.params.productName, {
            data: this.state.comments.concat([newComment])
        })
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-md-4">
                        <h3>Santa Baby...</h3>
                        <img src="./images/for-santa.jpg" alt="Santa Baby" />
                    </div>
                    <div className="col-md-4">
                        <h3>For Santa Collection</h3>
                        <p>Coffee Mug and Plate - For Santa's milk and cookies on Christmas Eve</p>
                    </div>
                    <div className="col-md-4">
                        <h3>Cost Per Item: $25.00</h3>
                        <p>Estimated Time to Prepare: 3 Days</p>
                        <a href="http://etsy.com" target="_blank" className="btn btn-primary" role="button">Buy Now on Etsy</a>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="col-md-4">
                        <Comments
                            productName={this.props.params.productName}
                            comments={this.state.comments}
                            addComment={(newComment) => this.handleAddComment(newComment)}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default Product
