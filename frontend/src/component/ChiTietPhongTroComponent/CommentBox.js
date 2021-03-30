import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { newCommnet } from "../../_helper/comment.helper"
import avatar from '../../image/avatar.jpg'
import { socket } from "../../_socket/socket.main"

//Khung bình luận
class CommentBox extends React.Component {
  //state chứa bình luận
  constructor(props) {
    super(props);
    this.state = {
      isRedirect: false,
      showComments: true,
      commentText: JSON.parse(localStorage.getItem("comment")) || [],
      comments: this.props.commnent,
      cmtCount: 5,
      cmtMess: ""
    };
  }
  // clicked add comment
  newCommnet = async () => {

    //check user sigin 
    if (this.props.data.user === null) {
      var comment = JSON.parse(localStorage.getItem('comment')) || [];
      comment.push({ id: this.props.id, cmt: this.state.cmtMess })
      localStorage.setItem("comment", JSON.stringify(comment))
      this.setState({ isRedirect: true })
    } else {
      try {
        //add new comment to database
        var res = await newCommnet({ idUser: this.props.data.user.id, idPost: this.props.id, content: this.state.cmtMess,pathName:this.props.pathName });
        /**
         * @return object
         * @param status true or fale
         * @param messege field in database has updated
         */
        if (res.status) {
          this.setState({ cmtMess: "" })
          socket.emit('newcomment', { idPost: this.props.id, idUser: this.props.data.user.id });
        } else {
          console.log(res);
        }
      } catch (e) { console.log(e); }
    }
  };
  showMoreCommnent = () => { this.setState({ cmtCount: this.state.comments.length <= this.state.cmtCount + 5 ? this.state.comments.length : this.state.cmtCount + 5 }) }
  isChangeCmt = (e) => {
    //save current value in input comment
    var value = e.target.value;
    this.setState({ cmtMess: value })
    this.props.onChange(value);

    //check if have comment object on localstore => delelete localstore
    localStorage.getItem("comment") && localStorage.removeItem("comment")
  }

  isClickShowCmt = () => {
    this.setState({ showComments: !this.state.showComments })
  }
  componentDidMount() {
    socket.on('addcomment', (res) => {
      var listNewComment = res.filter(c => c.idPost == this.props.id);
      this.setState({ comments: listNewComment })
    });
  }
  render() {

    return this.state.isRedirect ? <Redirect to='/dangnhap'></Redirect> :
      (
        <div className="container">
          <div className="d-flex flex-column comment-section">
            <div className="bg-light p-2">
              <div className="d-flex flex-row align-items-start">
                <img className="rounded-circle" src={this.props.data.user?.avatar || avatar} width={40} />
                <textarea className="form-control ml-1 shadow-none textarea"
                  defaultValue={this.state.commentText.find(val => val.id == this.props.id) ? this.state.commentText.find(val => val.id == this.props.id).cmt : ""}
                  onChange={this.isChangeCmt}
                  value={this.state.cmtMess}
                  placeholder="Nội dung bình luận"
                  rows="4"
                /></div>
              <div className="mt-2 text-right">
                <button className="btn btnComment btn-sm shadow-none"
                  type="button"
                  title={!this.state.cmtMess && "Nhập bình luận"}
                  disabled={!this.state.cmtMess && this.props.data.user}
                  onClick={this.newCommnet}
                >{this.props.data.user ? "Bình luận" : "Đăng nhập để bình luận"}</button><button className="btn btnComment btn-sm ml-1 shadow-none" onClick={this.isClickShowCmt}
                  type="button">{this.state.showComments ? "Ẩn bình luận" : "Hiện thị bình luận"}</button></div>
            </div>

            {this.state.showComments && [...this.state.comments].sort((a, b) => a.id - b.id).reverse().map((value, index) =>
              index <= this.state.cmtCount ?
                <div className="bg-white p-2">
                  <div className="d-flex flex-row user-info">
                    <img className="rounded-circle" src={value.user?.avatar || avatar} width={40} />
                    <div className="d-flex flex-column justify-content-start ml-2"><span className="d-block font-weight-bold name">{value.user.First_name} {value.user.Last_name}</span><span className="date text-black-50">{value.Created_at ? value.Created_at : ""}</span></div>
                  </div>
                  <div className="mt-2">
                    <p className="comment-text">{value.NoiDung}</p>
                  </div>
                  <div className="bg-white">
                    <div className="d-flex flex-row fs-12">
                      <div className="like p-2 cursor"><i className="fa fa-thumbs-o-up" /><span className="ml-1">Like</span></div>
                      <div className="like p-2 cursor"><i className="fa fa-commenting-o" /><span className="ml-1">reply</span></div>
                      <div className="like p-2 cursor"><i className="fa fa-share" /><span className="ml-1">Share</span></div>
                    </div>
                  </div>
                </div>
                : null
            )}
            {this.state.cmtCount < this.state.comments.length && this.state.showComments && <button type="button" onClick={this.state.comments.length > this.state.cmtCount ? this.showMoreCommnent : null} class="btn btnComment">Hiện thêm 5 bình luận</button>}
          </div>
        </div>
      );
  }
} //Khung bình luận

const mapStateToProps = (state, ownProps) => {
  return {
    data: state.Account
  }
}

export default connect(mapStateToProps)(CommentBox)
