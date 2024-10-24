import { Form, Input, InputNumber, Switch, notification } from "antd";
import { Col, Row } from "antd";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

const CreateOrchid = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: "",
      rating: 0,
      isSpecial: true,
      image: "",
      color: "",
      origin: "",
      category: "",
      video: "",
    },
    onSubmit: async (values) => {
      console.log(values);
      const { name, rating, isSpecial, image, color, origin, category, video } =
        values;
      const data = {
        name,
        rating,
        isSpecial,
        image,
        color,
        origin,
        category,
        video,
      };
      fetch("https://66ff148b2b9aac9c997e368a.mockapi.io/orchids", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
          notification.success({
            message: "Create orchid success",
          });
          navigate("/admin/manager-orchid");
        })
        .catch((error) => {
          console.log(error);
          notification.error({
            message: "Create orchid failed",
          });
        });
    },
  });

  const handleChangeValue = (name) => {
    return (value) => {
      formik.setFieldValue(name, value);
    };
  };
  return (
    <Form
      style={{
        width: "800px",
        border: "1px solid #cacaca",
        padding: "10px 20px",
        position: "relative",
        top: "50%",
        left: "50%",
        borderRadius: "10px",
        transform: "translate(-50%, 50%)",
      }}
      onSubmitCapture={formik.handleSubmit}
      labelCol={{
        span: 10,
      }}
      wrapperCol={{
        span: 100,
      }}
      layout="vertical"
    >
      <h4>Create Orchid</h4>

      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col className="gutter-row" span={12}>
          <Form.Item label="Name">
            <Input size="large" name="name" onChange={formik.handleChange} />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={12}>
          <Form.Item label="Image">
            <Input size="large" name="image" onChange={formik.handleChange} />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={12}>
          <Form.Item label="Color">
            <Input size="large" name="color" onChange={formik.handleChange} />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={12}>
          <Form.Item label="Origin">
            <Input size="large" name="origin" onChange={formik.handleChange} />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={12}>
          <Form.Item label="Category">
            <Input
              size="large"
              name="category"
              onChange={formik.handleChange}
            />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={12}>
          <Form.Item label="Video">
            <Input size="large" name="video" onChange={formik.handleChange} />
          </Form.Item>
        </Col>

        <Col className="gutter-row" span={6}>
          <Form.Item label="IsSpecial" valuePropName="checked">
            <Switch
              name="isSpecial"
              onChange={handleChangeValue("isSpecial")}
            />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={6}>
          <Form.Item label="Rating">
            <InputNumber
              name="rating"
              onChange={handleChangeValue("rating")}
              min={1}
              max={10}
            />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item className="d-flex justify-content-end">
        <button type="submit" className="btn btn-primary">
          Create Orchid
        </button>
      </Form.Item>
    </Form>
  );
};

export default CreateOrchid;
