import React, { useEffect } from "react";
import { ListGroup } from "react-bootstrap";
import { useState } from "react";
import Loading from "../Loading";
import "./styles.css";
import { useDispatch } from "react-redux";
import { addNewThread, postComment } from "../../store/bookclubs/actions";

export default function ThreadsDisplay(props) {
  const dispatch = useDispatch();
  const { bookClubDetails, isParticipant } = props;
  console.log(bookClubDetails);
  const [threadTopic, setThreadtopic] = useState("");
  const [viewThreadForm, setViewThreadForm] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [viewComments, setViewComments] = useState({});
  const [thread, setThread] = useState(null);

  useEffect(() => {
    let view = {};
    if (bookClubDetails) {
      bookClubDetails.threads.forEach((thread) => {
        view[thread.id] = viewComments[thread.id] || false;
      });
    }
    setViewComments(view);
  }, [bookClubDetails]);
  const handleView = (threadId) => {
    setViewComments({
      ...viewComments,
      [threadId]: !viewComments[threadId],
    });
    // console.log("view comments", viewComments);
    // console.log("thread state", viewComments[threadId]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postComment(newComment, bookClubDetails.id, thread));
  };
  return (
    <div style={{ margin: "75px 0" }}>
      <h3>Threads</h3>
      <ul className="list-group">
        {bookClubDetails.threads.length === 0
          ? "No threads yet!"
          : bookClubDetails.threads.map((thread) => {
              return (
                <div key={thread.id}>
                  <li
                    key={thread.id}
                    className="list-group-item d-flex justify-content-between align-items-center list-item"
                  >
                    {thread.topic}
                    <span onClick={() => handleView(thread.id)}>
                      <span className="see-thread">
                        {" "}
                        {viewComments[thread.id]
                          ? "Close Thread"
                          : "See Thread"}
                      </span>
                    </span>
                  </li>
                  {!viewComments[thread.id] ? (
                    ""
                  ) : thread.comments.length === 0 ? (
                    <div>No comments yet</div>
                  ) : (
                    thread.comments.map((comment) => {
                      return (
                        <div className="comments-container justify-content-center mt-5 border-left border-right">
                          <div className="d-flex justify-content-center py-2">
                            <div className="second py-2 px-2">
                              {" "}
                              <span className="text1">{comment.comment}</span>
                              <div className="d-flex justify-content-between py-1 pt-2">
                                <div>
                                  <span className="text2">
                                    <strong>~{comment.user.name}~</strong>
                                  </span>
                                </div>
                                <div>
                                  <span className="text3">👍:</span>
                                  <span className="thumbup">
                                    <i className="fa fa-thumbs-o-up"></i>
                                  </span>
                                  <span className="text4">{comment.likes}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                  {!viewComments[thread.id] ? (
                    ""
                  ) : (
                    <div className="container d-flex ">
                      <div className=" p-3">
                        <h5>Add comments</h5>{" "}
                        <form onSubmit={handleSubmit}>
                          <textarea
                            value={newComment}
                            // id="textarea"
                            className="comment-control-form"
                            onChange={(e) => {
                              setNewComment(e.target.value);
                              setThread(thread.id);
                            }}
                          />{" "}
                          <div className="d-flex justify-content-between align-items-center">
                            {" "}
                            <span id="count"></span>{" "}
                            <button
                              className="btn btn-sm btn-primary"
                              type="submit"
                            >
                              Comment
                            </button>{" "}
                          </div>
                        </form>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
      </ul>

      <div className="add-thread">
        <button
          onClick={(e) => {
            e.preventDefault();
            setViewThreadForm(!viewThreadForm);
          }}
        >
          +New Thread
        </button>
        {!viewThreadForm ? (
          ""
        ) : (
          <div className="thread-form">
            <label htmlFor="topic"></label>
            <input
              placeholder="Discuss on"
              name="topic"
              value={threadTopic}
              onChange={(e) => {
                setThreadtopic(e.target.value);
              }}
            />
            <button
              onClick={(e) => {
                e.preventDefault();
                dispatch(addNewThread(bookClubDetails.id, threadTopic));
              }}
            >
              add
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
