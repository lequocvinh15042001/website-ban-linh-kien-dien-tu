import React from 'react'
import { GiCompass, GiDiamondHard, GiStabbedNote } from 'react-icons/gi'
export const links = [
  {
    id: 1,
    text: 'Trang chủ',
    url: '/',
  },
  {
    id: 2,
    text: 'Về chúng tôi',
    url: '/about',
  },
  {
    id: 3,
    text: 'Sản phẩm',
    url: '/products',
  },
  {
    id: 4,
    text: 'Blog',
    url: '/blog',
  },
  {
    id: 5,
    text: 'Liên hệ',
    url: '/contact',
  }
]

export const services = [
  {
    id: 1,
    icon: <GiCompass />,
    title: 'sứ mệnh',
    text:
      'Bản thân khách hàng, khách hàng sẽ có thể theo dõi những sản phẩm linh kiện của công ty. Những linh kiện, sản phẩm điện tử được chúng tôi  chọn lọc rất kỹ càng, mang đến niềm tin và độ chính xác cao cho khách hàng, tự hào là dịch vụ số một Thành phố Hồ Chí Minh',
  },
  {
    id: 2,
    icon: <GiDiamondHard />,
    title: 'tầm nhìn',
    text:
      'Bản thân khách hàng, khách hàng sẽ có thể theo dõi những sản phẩm linh kiện của công ty. Những linh kiện, sản phẩm điện tử được chúng tôi  chọn lọc rất kỹ càng, mang đến niềm tin và độ chính xác cao cho khách hàng, tự hào là dịch vụ số một Thành phố Hồ Chí Minh',
  },
  {
    id: 3,
    icon: <GiStabbedNote />,
    title: 'hội nhập',
    text:
      'Bản thân khách hàng, khách hàng sẽ có thể theo dõi những sản phẩm linh kiện của công ty. Những linh kiện, sản phẩm điện tử được chúng tôi  chọn lọc rất kỹ càng, mang đến niềm tin và độ chính xác cao cho khách hàng, tự hào là dịch vụ số một Thành phố Hồ Chí Minh',
  },
]

export const products_url = 'https://sachu-ecommerce-store-api.herokuapp.com/api/products'

export const single_product_url = `https://sachu-ecommerce-store-api.herokuapp.com/api/products/`
