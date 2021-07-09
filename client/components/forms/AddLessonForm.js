import { Button } from "antd";

import React from "react";

const AddLessonForm = ({ values, setValues, handleAddLesson, uploading }) => {
  return (
    <div className="container pt-3">
      <form onSubmit={handleAddLesson}>
        <input
          type="text"
          className="form-control square"
          onChange={e => setValues({ ...values, title: e.target.value })}
          value={values.title}
          placeholder="Title"
          autoFocus
          required
        />
        <textarea
          cols="7"
          rows="7"
          type="text"
          className="form-control mt-3"
          onChange={e => setValues({ ...values, content: e.target.value })}
          value={values.content}
          placeholder="Content"
        />

        <Button
          onClick={handleAddLesson}
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

export default AddLessonForm;
