import React, { useState } from 'react';

const Rating = ({ rating, onRatingChange }) => {
    const stars = [1, 2, 3, 4, 5];
    return (
        <div className="rating">
            {stars.map((star) => (
                <span
                    key={star}
                    onClick={() => onRatingChange(star)}
                    className={star <= rating ? 'star selected' : 'star'}
                >
                    ★
                </span>
            ))}
        </div>
    );
};

const ReviewComponent = () => {
    const [selectedProduct, setSelectedProduct] = useState('');
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [image, setImage] = useState(null);

    const handleProductChange = (e) => setSelectedProduct(e.target.value);
    const handleRatingChange = (newRating) => setRating(newRating);
    const handleCommentChange = (e) => setComment(e.target.value);
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!selectedProduct || !rating || !comment) {
            alert('Vui lòng chọn sản phẩm, đánh giá sao và nhập bình luận!');
            return;
        }

        const reviewData = {
            product: selectedProduct,
            rating,
            comment,
            image,
        };

        console.log('Đánh giá đã được gửi:', reviewData);
        alert('Cảm ơn bạn đã gửi đánh giá!');
        setSelectedProduct('');
        setRating(0);
        setComment('');
        setImage(null);
    };

    return (
        <div className="review-container">
            <h2>Đánh giá sản phẩm</h2>
            <form onSubmit={handleSubmit} className="review-form">
                <div>
                    <label>Chọn sản phẩm:</label>
                    <select value={selectedProduct} onChange={handleProductChange}>
                        <option value="">Chọn loại sản phẩm</option>
                        <option value="Cà phê">Cà phê</option>
                        <option value="Trà">Trà</option>
                        <option value="Sinh tố">Sinh tố</option>
                    </select>
                </div>

                <div>
                    <label>Đánh giá sao:</label>
                    <Rating rating={rating} onRatingChange={handleRatingChange} />
                </div>

                <div>
                    <label>Bình luận:</label>
                    <textarea value={comment} onChange={handleCommentChange} placeholder="Nhập bình luận của bạn..." />
                </div>

                <div>
                    <label>Chọn hình ảnh (tuỳ chọn):</label>
                    <input type="file" accept="image/*" onChange={handleImageChange} />
                    {image && <img src={image} alt="Hình ảnh đánh giá" style={{ width: '100px', marginTop: '10px' }} />}
                </div>

                <button type="submit">Gửi Đánh Giá</button>
            </form>

            <style jsx>{`
        .review-container {
          max-width: 500px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f9f9f9;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        .review-form div {
          margin-bottom: 15px;
        }

        .review-form input,
        .review-form select,
        .review-form textarea {
          width: 100%;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 4px;
        }

        .review-form button {
          padding: 10px 20px;
          background-color: #4CAF50;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }

        .review-form button:hover {
          background-color: #45a049;
        }

        .rating {
          display: flex;
        }

        .star {
          cursor: pointer;
          font-size: 24px;
          color: gray;
        }

        .star.selected {
          color: gold;
        }
      `}</style>
        </div>
    );
};

export default ReviewComponent;
