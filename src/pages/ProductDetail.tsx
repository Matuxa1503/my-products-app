import { FC, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { IProduct } from '../models/IProduct';
import { Form } from '../components/Form';
import { IProductForm } from '../models/IProductForm';
import { deleteStatusFavorite, updateProduct } from '../store/reducers/productsSlice';
import { removeFromFavorites } from '../store/reducers/favoritesSlice';

export const ProductDetail: FC = () => {
  const { products, isLoading, error } = useAppSelector((state) => state.productsReducer);
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const [product, setProduct] = useState<IProduct | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [defaultValues, setDefaultValues] = useState<IProductForm>();

  useEffect(() => {
    if (products) {
      const product = products.find((p) => p.id === Number(id)) || null;
      setProduct(product);
    }
  }, [products, id]);

  useEffect(() => {
    if (product) {
      const values = {
        id: product.id,
        title: product.title,
        price: product.price,
        description: product.description,
        category: product.category,
      };
      setDefaultValues(values);
    }
  }, [product]);

  const onSubmit = (data: IProductForm, reset: () => void) => {
    let currentImg = product?.image;

    if (data.image?.length) {
      currentImg = URL.createObjectURL(data.image[0]); // отображение выбранного изображения
    }

    if (!data.id) return;

    const obj = {
      id: data.id,
      title: data.title,
      price: data.price,
      description: data.description,
      category: data.category,
      image: currentImg || '',
    };

    dispatch(updateProduct(obj));
    dispatch(removeFromFavorites(data.id));
    dispatch(deleteStatusFavorite(data.id));
    reset();
    setShowModal(false);
  };

  if (isLoading) {
    return <h1>Загрузка данных...</h1>;
  }
  if (!product) {
    return <h1>Товар не найден</h1>;
  }
  if (error) {
    return <h1>Ошибка: {error}</h1>;
  }

  return (
    <div>
      <div className="flex justify-between">
        <Link to={'/products'} className="border rounded-lg px-4 py-2 hover:bg-gray-200 transition-colors">
          Вернуться на главную
        </Link>
        <button onClick={() => setShowModal(true)} className="border rounded-lg px-4 py-2 hover:bg-gray-200 transition-colors">
          Редактировать товар
        </button>
      </div>

      <div className="mt-4">
        <h1 className="text-4xl">{product.title}</h1>
        <p className="py-3 first-letter:capitalize">{product.description}</p>
        <p>Категория: {product.category}</p>
        <div className="flex items-end gap-20">
          <img className="w-[500px] h-[500px] object-contain mt-5" src={product.image} />
          <div>
            {product.rating?.rate && <p className="text-3xl">Оценка: {product.rating.rate} / 5</p>}
            {product.rating?.count && <p className="text-3xl">Куплено: {product.rating.count}</p>}
            <p className="text-5xl">Стоимость: ${product.price}</p>
          </div>
        </div>
      </div>

      {showModal && (
        <div onClick={() => setShowModal(false)} className="fixed bg-black/50 inset-0">
          <div onClick={(e) => e.stopPropagation()}>
            <Form onSubmit={onSubmit} valueBtn={'Сохранить изменения'} defaultValues={defaultValues} />
          </div>
        </div>
      )}
    </div>
  );
};
