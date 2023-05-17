import fileSearch from '../assets/file-search.svg';

const Card = () => {
  return (
    <div className="card">
      <div className="card-header">
        <div className="card-icon">
          <img src={fileSearch} alt="task searched icon" />
        </div>
        <h3>Taske random</h3>
      </div>
      <p className="card-p_description">as ad sd as da sd as da s sd</p>
      <p>20 de mayo</p>
    </div>
  );
};

export default Card;
