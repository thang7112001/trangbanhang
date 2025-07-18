import {useEffect, useState} from "react";
import axios from "axios";
import './giaodien.css';

export default function ListProduct() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [categorySelected, setCategorySelected] = useState(null);
    const [newProduct, setNewProduct] = useState({
        title: "",
        category: "",
        price: "",
        review: []
    });

    function loadProduct() {
        axios.get("http://localhost:9999/products").then(response => {
            let list = response.data;
            let listCategory = [];
            for (let i = 0; i < list.length; i++) {
                if (listCategory.indexOf(list[i].category) === -1) {
                    listCategory.push(list[i].category);
                }
            }
            setCategories(listCategory);
            setProducts(response.data)
        })
    }

    function handleOnchange(e) {
        setNewProduct({...newProduct, [e.target.name]: e.target.value});
    }

    function addProduct() {
        axios.post("http://localhost:9999/products", newProduct).then(response => {
            setProducts([...products, {...newProduct, price: Number(newProduct.price)}]);
            setNewProduct({title: '', category: '', price: 0, review: []});
            loadProduct();
        })
    }

    function filterA(x) {
        console.log(x)
        if (categorySelected === null) return x;
        console.log(x)
        return x.filter(product => product.category === categorySelected);
    }
function deletedProduct(id) {
    axios.delete("http://localhost:9999/products/"+ id).then(x=>{
        loadProduct();
    })
}
    useEffect(() => {
        loadProduct();
    }, []);
    return (
        <>
            <div className={'contain'}>
                <div className={"list"}>
                    <h1>LIST PRODUCT</h1>
                    <select value={categorySelected} onChange={e => setCategorySelected(e.target.value)}>
                        <option value={null}>---Style---</option>
                        {categories.map((category) => (
                            <option value={category}>{category}</option>
                        ))}
                    </select>
                    {filterA(products).map((product) => (
                        <h2>{product.title}: {product.category}, {product.price}
                        <button >EDIT</button>
                        <button onClick={()=>{deletedProduct(product.id)}}>DELETE</button>
                        </h2>

                    ))}
                    <input type="text"
                           placeholder={"nhap ten sp"}
                           value={newProduct.title}
                           name={"title"}
                           onChange={handleOnchange}/>
                    <input type="text"
                           placeholder={"nhap gia sp"}
                           value={newProduct.price}
                           name={"price"}
                           onChange={handleOnchange}/>
                    <select value={newProduct.category} name={"category"} onChange={handleOnchange}>
                        <option value="">---Style---</option>
                        {categories.map((category) => (
                            <option value={category}>{category}</option>
                        ))}
                    </select>
                    <button onClick={addProduct}>ADD</button>
                </div>
                <div className={'detail'}>

                </div>
            </div>
        </>
    )
}