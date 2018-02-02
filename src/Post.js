import React, { Component } from 'react';
import logo from './logo.svg';
import './Post.css';

function Post(props) {

      return (
        <div className="post">
           <div className="postTitle">{props.post.title}</div>
           
           <div className="content">{props.post.body}</div>
        </div>
      );

}

export default Post;