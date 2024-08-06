import React, { useState } from 'react';
import { CCollapse } from '@coreui/react';
import ProductList from './ProductList';
import image1 from './../asset/images/image1.jpg'
import image2 from './../asset/images/image2.jpg'
import image3 from './../asset/images/image3.jpg'
import image4 from './../asset/images/image4.png'
import './css/Category.css'; 
const Category = () => {
  const [visible1, setVisible1] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [visible3, setVisible3] = useState(false);
  const [visible4, setVisible4] = useState(false);
  const handleToggle = (section) => {
    setVisible1(section === 1 ? !visible1 : false);
    setVisible2(section === 2 ? !visible2 : false);
    setVisible3(section === 3 ? !visible3 : false);
    setVisible4(section === 4 ? !visible4 : false);
  };

  return (
    <>
    <div className="categories">
        <div style={{ textAlign: 'center' }}>
          <img
            src={image1}
            alt="Kitchen"
            onClick={() => handleToggle(1)}
            aria-controls="collapseWidthExample1"
           className="categories-images"
          />
          <p>Kitchen</p>
        </div>
        <div style={{ textAlign: 'center' }}>
          <img
            src={image2}
            alt="Living Room"
            onClick={() => handleToggle(2)}
            aria-controls="collapseWidthExample2"
           className="categories-images"
          />
          <p>Living Room</p>
        </div>
        <div style={{ textAlign: 'center' }}>
          <img
            src={image4}
            alt="Study Room"
            onClick={() => handleToggle(3)}
            aria-controls="collapseWidthExample3"
           className="categories-images"
          />
          <p>Study Room</p>
        </div>
        <div style={{ textAlign: 'center' }}>
          <img
            src={image3}
            alt="Bedroom"
            onClick={() => handleToggle(4)}
            aria-controls="collapseWidthExample4"
           className="categories-images"
          />
          <p>Bedroom</p>
        </div>
      </div>
      <div style={{ minHeight: '120px' }}>
        <CCollapse id="collapseWidthExample1" horizontal visible={visible1}>
          <ProductList
           category = "kitchen"
           />
        </CCollapse>
        <CCollapse id="collapseWidthExample2" horizontal visible={visible2}>
          <ProductList 
          category = "Living Room"
          />
        </CCollapse>
        <CCollapse id="collapseWidthExample3" horizontal visible={visible3}>
          <ProductList 
          category = "Study Room"
          />
        </CCollapse>
        <CCollapse id="collapseWidthExample4" horizontal visible={visible4}>
          <ProductList 
          category = "Bedroom"
          />
        </CCollapse>
      </div>
    </>
  );
};

export default Category;
