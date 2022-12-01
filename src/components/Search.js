import { React, useState } from 'react'
import TextField from '@material-ui/core/TextField';
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Button } from 'react-bootstrap'

const Search = () => {
    const productList = useSelector(state => state.productList)
    const { products } = productList
    console.log('==', products?.data?.list)

    // Search
    const myOptions = [];
    const getDataSearch = (product) => {
        product?.data?.list?.forEach(prod => {
            myOptions.push(prod.name)
        })
    }

    const navigate = useNavigate()

    getDataSearch(products)

    const [selectedOptions, setSelectedOptions] = useState('');

    const handleSubmit = () => {
        // console.log('==', selectedOptions);
        products?.data?.list?.find(prod => {
            if (prod.name === selectedOptions) {
                navigate(`/products/${prod.id}`)
            }
        })
    }
    return (
        <div>
            <div className='d-flex align-items-center mb-5 py-0 px-3 shadow-sm p-3 mb-5 bg-white rounded' style={{ background: '#ffffff', borderRadius: '10px', border: 'solid 1px #3CB371' }}>
                <div className='w-100'>
                    <Autocomplete disablePortal options={myOptions.sort()} onChange={(event, value) => setSelectedOptions(value)}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                InputProps={{ ...params.InputProps, disableUnderline: true }}
                                placeholder='Nhập tên sản phẩm cần tìm'
                            />
                        )}
                    />
                </div>
                <div>
                    <Button onClick={handleSubmit} style={{ background: 'transparent', border: 'none', margin: '0px', padding: '10px 0px', width: '50px', height: 'auto' }}>
                        <i style={{ color: 'green' }} class="fas fa-search py-2"></i>
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Search