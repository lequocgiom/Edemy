import { Button, Progress, Tooltip } from "antd";
import { CloseCircleFilled } from "@ant-design/icons";

import React from "react";

const UpdateLessonForm = ({
  current,
  setCurrent,
  handleUpdateLesson,
  uploading,
  uploadVideoButtonText,
  handleVideo,
  progress
}) => {
  return (
    <div className="container pt-3">
      <form onSubmit={handleUpdateLesson}>
        <input
          type="text"
          className="form-control square"
          onChange={e => setValues({ ...current, title: e.target.value })}
          value={current.title}
          placeholder="Title"
          autoFocus
          required
        />
        <textarea
          cols="7"
          rows="7"
          type="text"
          className="form-control mt-3"
          onChange={e => setValues({ ...current, content: e.target.value })}
          value={current.content}
          placeholder="Content"
        />

        <div className="d-flex justify-content-center fd-col">
          <label className="btn btn-dark btn-block text-left mt-3 w-100">
            {uploadVideoButtonText}
            <input onChange={handleVideo} type="file" accept="video/*" hidden />
          </label>
          {!uploading && current.video && current.video.Location && (
            <div className="pt-2 d-flex justify-content-center">
              Show video player on react player
            </div>
          )}
        </div>

        {progress > 0 && (
          <Progress
            className="d-flex justify-content-center pt-2"
            percent={progress}
            steps={10}
          />
        )}

        <div className="d-flex justify-content-between">
          <span className="pt-3 badge" style={{ color: "black" }}>
            Preview
          </span>
        </div>

        <Button
          onClick={handleUpdateLesson}
          className="col mt-3 w-100"
          size="large"
          type="primary"
          loading={uploading}
          shape="round"
        >
          Save
        </Button>
      </form>
    </div>
  );
};

export default UpdateLessonForm;
