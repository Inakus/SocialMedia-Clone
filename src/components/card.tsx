import { ICard } from "../interface/interface";

const Card = ({ userName, title, content }: ICard) => {
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <div className="card-body">
        <h1 className="card-title text-[30px]">{userName}</h1>
        <hr className="my-2 h-px bg-gray-700 border-0" />
        <h2 className="card-title">{title}</h2>
        <p>{content}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default Card;
