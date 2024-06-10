import { useState, useEffect } from "react";
import "./App.css";
import { Button, Modal, Form, Input, Table } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { forecastFetch } from "./forecastSlice";

function App() {
  const [city, setCity] = useState("New York");
  const [info, setInfo] = useState([]);
  const {
    cityName,
    temperature1,
    temperature2,
    temperature3,
    date1,
    date2,
    date3,
    loading,
  } = useSelector((state) => state.forecast);

  const dispatch = useDispatch();

  const changeCity = (event) => {
    setCity(event.target.value);
  };

  useEffect(() => {
    if (loading !== true && cityName !== null) {
      if (cityName !== null)
        setInfo([
          ...info,
          { cityName, temperature1, temperature2, temperature3 },
        ]);
    }
  }, [cityName]);

  useEffect(() => {
    dispatch(forecastFetch(city));
  }, []);

  const getForecast = () => {
    dispatch(forecastFetch(city));
  };

  const handleDelete = (event) => {
    setInfo((info) => {
      return info.filter((city) => city.cityName !== event.cityName);
    });
  };

  const [modalOpen, setModalOpen] = useState(false);
  const [form] = Form.useForm();

  const handleClick = () => {
    getForecast();
    setModalOpen(false);
  };

  const columns = [
    {
      title: "City",
      dataIndex: "cityName",
      key: "cityName",
    },
    {
      title: date1,
      dataIndex: "temperature1",
      key: "temp1",
    },
    {
      title: date2,
      dataIndex: "temperature2",
      key: "temp2",
    },
    {
      title: date3,
      dataIndex: "temperature3",
      key: "temp3",
    },
    {
      title: "Action",
      key: "delete",
      fixed: "right",
      render: (event) => (
        <a
          onClick={() => {
            handleDelete(event);
          }}
        >
          delete
        </a>
      ),
    },
  ];

  return (
    <>
      <div className='container'>
        <h1 className='heading'>Weather App</h1>
        <Button size='large' className='btn' onClick={() => setModalOpen(true)}>
          <PlusOutlined />
        </Button>
        <Modal
          title='Add new city'
          centered
          open={modalOpen}
          okText='Add'
          onOk={handleClick}
          onCancel={() => setModalOpen(false)}
          destroyOnClose
        >
          <Form form={form} preserve={false}>
            <Form.Item label='City' name='city'>
              <Input onChange={changeCity} />
            </Form.Item>
          </Form>
        </Modal>
        <div id='test'>
          {console.log(info)}
          <Table
            columns={columns}
            dataSource={info}
            rowKey={(data) => data.cityName}
          />
        </div>
      </div>
    </>
  );
}

export default App;
