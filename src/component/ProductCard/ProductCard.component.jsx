import { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.style.scss';
import { ReactComponent as AddCartIcon } from '../../style/assets/add_cart.svg';

class ProductCard extends PureComponent {
  render() {
    const { productInfo, activeCurrency, handleAddToCart } = this.props;
    const filteredPrice = productInfo.prices.filter(
      (price) => price.currency.label === activeCurrency.label,
    )[0];
    const stockStyle = (productInfo.inStock) ? { opacity: '100%', cursor: 'pointer' } : { opacity: '50%', cursor: 'default' };
    const GoTo = (productInfo.inStock) ? `../${productInfo.category}/${productInfo.id}` : './';
    return (
      <Link to={GoTo} className="Link">
        <div className="ProductCardContainer" style={stockStyle}>
          <div className="ImageContainer">
            <img src={productInfo.gallery[0]} alt="" />
            {!productInfo.inStock && <h2>OUT OF STOCK</h2>}
          </div>
          <h3>{productInfo.name}</h3>
          <h4>
            {filteredPrice.currency.symbol}
            {' '}
            {filteredPrice.amount}
          </h4>
          {productInfo.inStock && (
          <AddCartIcon
            onClick={() => { handleAddToCart(productInfo); }}
            className="AddToCartIcon"
          />
          )}
        </div>
      </Link>

    );
  }
}

export default ProductCard;
