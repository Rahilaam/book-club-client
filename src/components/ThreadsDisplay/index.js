import React from "react";
import { ListGroup } from "react-bootstrap";
import { useState } from "react";
import Loading from "../Loading";
import "./styles.css";

export default function ThreadsDisplay(props) {
  const { bookClubDetails } = props;
  console.log(bookClubDetails);
  const [viewComments, setViewComments] = useState(
    !bookClubDetails
      ? []
      : bookClubDetails.threads.map((thread) => {
          return { threadId: `${thread.id}`, view: false };
        })
  );

  const handleView = (givenId) => {
    console.log(typeof givenId);
    const viewCommentsNew = [...viewComments].map((item) => {
      if (parseInt(item.threadId) === givenId) {
        return { ...item, view: !item.view };
      }
      return item;
    });
    console.log("new", viewCommentsNew);
    setViewComments(viewCommentsNew);
  };

  const checkThreadView = (givenId) => {
    const thread = [...viewComments].find((item) => {
      return parseInt(item.threadId) === givenId;
    });
    // if(!thread){
    //   return <Loading/>
    // }
    if (thread) {
      if (thread.view) {
        return true;
      }
      return false;
    }
    return false;
  };
  console.log("old", viewComments);
  console.log("check thread");

  return (
    <div style={{ margin: "75px 0" }}>
      <h3>Threads</h3>
      <ul className="list-group">
        {bookClubDetails.threads.length === 0
          ? "No threads yet!"
          : bookClubDetails.threads.map((thread) => {
              return (
                <div key={thread.id}>
                  <li className="list-group-item d-flex justify-content-between align-items-center list-item">
                    {thread.topic}
                    <span
                      onClick={(e) => {
                        e.preventDefault();
                        handleView(thread.id);
                      }}
                    >
                      {checkThreadView(thread.id)
                        ? "Close Thread"
                        : "See Thread"}
                    </span>
                  </li>
                  {!checkThreadView(thread.id) ? (
                    ""
                  ) : thread.comments.length === 0 ? (
                    <div>No comments yet</div>
                  ) : (
                    thread.comments.map((comment) => {
                      return (
                        <div class="comments-container justify-content-center mt-5 border-left border-right">
                          <div class="d-flex justify-content-center py-2">
                            <div class="second py-2 px-2">
                              {" "}
                              <span class="text1">{comment.comment}</span>
                              <div class="d-flex justify-content-between py-1 pt-2">
                                <div>
                                  <span class="text2">{comment.user.name}</span>
                                </div>
                                <div>
                                  <span class="text3">Likes:</span>
                                  <span class="thumbup">
                                    <i class="fa fa-thumbs-o-up"></i>
                                  </span>
                                  <span class="text4">3</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                  {!checkThreadView(thread.id) ? (
                    ""
                  ) : (
                    <div class="container d-flex ">
                      <div class="comment-card p-3">
                        <h5>Add comments</h5>{" "}
                        <input id="textarea" class="comment-form-control" />{" "}
                        <div class="mt-3 d-flex justify-content-between align-items-center">
                          {" "}
                          <span id="count"></span>{" "}
                          <button class="btn btn-sm btn-danger">Submit</button>{" "}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
      </ul>
    </div>
  );
}
