import _ from "lodash";

export const modifyCart = (product, value, dispatch) => {
    const nextCount = value < 0 ? 0 : value >= product.stock ? product.stock : value;
    dispatch({ type: "MODIFYCART", payload: { [product.id]: { count: nextCount, id: product.id } } })
}

export const getProductDetails = (products, product_id) => {
    const index = _.findIndex(_.cloneDeep(products), (o) => Number(o.id) === Number(product_id));
    if (index !== -1)
        return products[_.findIndex(_.cloneDeep(products), (o) => Number(o.id) === Number(product_id))];
    else return undefined;
}