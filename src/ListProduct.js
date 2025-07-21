import {useEffect, useState} from "react";
import axios from "axios";
import './giaodien.css';

export default function ListProduct() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [categorySelected, setCategorySelected] = useState("");
    const [newProduct, setNewProduct] = useState({
        title: "",
        category: "",
        price: "",
        review: []
    });
    const [editProduct, setEditProduct] = useState(null);
    const [detailProduct, setDetailProduct] = useState(null);
    const [newReview, setNewReview] = useState({
        rating: '',
        comment: '',
        reviewerName: ''
    })

    function saveEditProduct() {
        axios.put('http://localhost:9999/products/' + editProduct.id, editProduct).then(x => {
            loadProduct()
        })
    }

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

    function handleEditOnchange(e) {
        setEditProduct({...editProduct, [e.target.name]: e.target.value});
    }

    function handleReviewOnchange(e) {
        setNewReview({...newReview, [e.target.name]: e.target.value});
    }

    function addProduct() {
        axios.post("http://localhost:9999/products", newProduct).then(response => {
            setProducts([...products, {...newProduct, price: Number(newProduct.price)}]);
            setNewProduct({title: '', category: '', price: 0, review: []});
            loadProduct();
        })
    }

    function filterA(x) {
        if (categorySelected === "") return x;
        return x.filter(product => product.category === categorySelected);
    }

    function deletedProduct(id) {
        axios.delete("http://localhost:9999/products/" + id).then(x => {
            loadProduct();
        })
    }

    function addReview() {
        let edited = {...detailProduct, reviews: [...detailProduct.reviews, newReview]};
        setDetailProduct(edited);
        axios.put('http://localhost:9999/products/' + detailProduct.id, edited).then(x => {
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
                        <option value={""}>---Style---</option>
                        {categories.map((category) => (
                            <option value={category}>{category}</option>
                        ))}
                    </select>
                    {filterA(products).map((product) => (
                        <h2>{product.title}: {product.category}, {product.price}
                            <button onClick={() => {
                                setDetailProduct(product);
                                setEditProduct(null);
                            }}>DETAIL
                            </button>
                            <button onClick={() => {
                                setEditProduct(product);
                                setDetailProduct(null);
                            }}>EDIT
                            </button>
                            <button onClick={() => {
                                deletedProduct(product.id)
                            }}>DELETE
                            </button>
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
                    {detailProduct && (
                        <>
                            <h4>{detailProduct.title}</h4>
                            {detailProduct.reviews && detailProduct.reviews.map((review) => (
                                <div>{review.reviewerName}:{review.comment}, rate:{review.rating}</div>
                            ))}
                            <input type="text"
                                   placeholder={"danh gia sp"}
                                   value={newReview.comment}
                                   name={"comment"}
                                   onChange={handleReviewOnchange}/>
                            <input type="text"
                                   placeholder={"ten"}
                                   value={newReview.reviewerName}
                                   name={"reviewerName"}
                                   onChange={handleReviewOnchange}/>
                            <select value={newReview.rating} name={"rating"} onChange={handleReviewOnchange}>
                                <option value="">---Rate---</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                            <button onClick={() => {
                                addReview(products)
                            }}>Comment
                            </button>
                        </>
                    )}
                    {editProduct && (
                        <>
                            <input type="text"
                                   placeholder={"nhap ten sp"}
                                   value={editProduct.title}
                                   name={"title"}
                                   onChange={handleEditOnchange}/>
                            <input type="text"
                                   placeholder={"nhap gia sp"}
                                   value={editProduct.price}
                                   name={"price"}
                                   onChange={handleEditOnchange}/>
                            <select value={editProduct.category} name={"category"} onChange={handleEditOnchange}>
                                <option value="">---Style---</option>
                                {categories.map((category) => (
                                    <option value={category}>{category}</option>
                                ))}
                            </select>
                            <button onClick={() => {
                                saveEditProduct()
                            }}>Save
                            </button>
                        </>
                    )}
                </div>
            </div>
        </>
    )
}