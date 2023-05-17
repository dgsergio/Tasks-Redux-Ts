import searchIcon from '../assets/search.svg';
import Card from './Card';
// import delIcon from '../assets/close-x.svg';

const FindTask = () => {
  return (
    <section>
      <form className="search-field">
        <input type="text" />
        <button className="input-icon" type="submit">
          <img src={searchIcon} alt="search icon" />
        </button>
      </form>
      <div className="cards">
        <Card />
      </div>
    </section>
  );
};

export default FindTask;
