import { PureComponent } from 'react';
import './CartItem.style.scss';
import { Link } from 'react-router-dom';
import { ReactComponent as MinusIcon } from '../../style/assets/minus-square.svg';
import { ReactComponent as PlusIcon } from '../../style/assets/plus-square.svg';
import ProductAttributesContainer from '../ProductAttributes';

class CartItem extends PureComponent {
  render() {
    const {
      product, size, activeCurrency, updateProductAmount, toggleCartOverlay,
    } = this.props;
    const filteredPrice = product.prices.filter(
      (price) => price.currency.label === activeCurrency.label,
    )[0];
    return (
      <div className="CartItemWrapper">
        <div className={`Separator ${size}`} />
        <div className="CartItemContainer">
          <div className="ItemPropertiesContainer">
            <h2 className={size}>{product.name}</h2>
            <h3 className={size}>{product.brand}</h3>
            <h4 className={size}>
              {filteredPrice.currency.symbol}
              {(filteredPrice.amount).toFixed(2)}
            </h4>
            <div className="ItemAttributesContainer">
              <ProductAttributesContainer
                attributes={product.attributes}
                size={size}
                noHeaders
              />
            </div>
          </div>
          <div className="AmountAndImageWrapper">
            <div className="ItemAmountContainer">
              <PlusIcon className={`UpdateAmountButton ${size}`} onClick={() => { updateProductAmount(product, product.amount + 1); }} />
              <div className={`AmountText  ${size}`}>{product.amount}</div>
              <MinusIcon className={`UpdateAmountButton ${size}`} onClick={() => { updateProductAmount(product, product.amount - 1); }} />
            </div>
            <Link to={`../${product.category}/${product.id}`} onClick={() => { toggleCartOverlay(false); }} className="ItemImageContainer">
              <img src={product.gallery[0]} alt="" className={size} />
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default CartItem;
