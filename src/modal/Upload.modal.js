import React from "react";
import ImgCrop from "antd-img-crop";
import { Button, Form, Input, Col, Row, Modal, Upload, Image } from "antd";
import { PlusOutlined } from "@ant-design/icons";
// CSS
import "../assets/css/style.css";

import default_image from "../assets/images/default.jpg";

const { TextArea } = Input;

export default function UploadImage() {
  // css

  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [imageUrl, setImageUrl] = React.useState("");

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // Form

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  // Upload

  const [fileList, setFileList] = React.useState([]);

  const onChange = async ({ fileList: file }) => {
    setFileList(file);

    let src = file[0].url;

    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file[0].originFileObj);

        reader.onload = () => resolve(reader.result);
      });
    }

    setImageUrl(src);
  };

  return (
    <>
      <Button
        style={{
          width: 50,
          height: 50,
          background: "#ef2e31",
          border: "1px solid #ef2e31",
        }}
        icon={<PlusOutlined style={{ fontSize: 30 }} />}
        type="primary"
        onClick={showModal}
        shape="circle"
      />
      <Modal
        title="UPLOAD IMAGE TO SYSTEM"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={800}
      >
        <Row>
          <Col span={12}>
            <div className="modal__box_preview">
              <b>Preview Image</b>
              {imageUrl !== "" ? (
                <Image
                  src={imageUrl}
                  style={{ width: "100%", height: "100%" }}
                  alt=""
                />
              ) : (
                <Image
                  src={default_image}
                  preview={false}
                  style={{ width: "100%", height: "100%" }}
                  alt=""
                />
              )}
            </div>
          </Col>
          <Col span={12}>
            <Form
              name="basic"
              labelCol={{
                span: 8,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
              layout="vertical"
            >
              <Form.Item label="Title Image" name="title">
                <Input />
              </Form.Item>

              <Form.Item label="Descriptions" name="desc">
                <TextArea />
              </Form.Item>

              <Form.Item label="Tags" name="tag">
                <Input />
              </Form.Item>

              <Form.Item
                label="Upload Image"
                rules={[
                  {
                    required: true,
                    message: "Please upload image!",
                  },
                ]}
              >
                <ImgCrop rotate>
                  <Upload
                    listType="picture-card"
                    fileList={fileList}
                    onChange={onChange}
                    onPreview={() => false}
                    onRemove={() => false}
                    beforeUpload={() => false}
                  >
                    {fileList.length < 5 && "+ Upload"}
                  </Upload>
                </ImgCrop>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Modal>
    </>
  );
}
