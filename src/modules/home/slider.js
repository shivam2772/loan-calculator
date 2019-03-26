import React from 'react';
import Slider from 'react-rangeslider';
import Select from 'react-select';
import PropTypes from 'prop-types';
import * as styles from './style.scss';

const Labels = {
  500: '$500',
  5000: '$5000'
};

const options = [];

for(let i=6; i< 25; i++) {
  const obj = {};
  obj.value = i;
  obj.label = i + ' months';
  options.push(obj);
}

class AmountSlider extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: 500,
      selectedOption: '6'
    };

    this.handleSliderChange = this.handleSliderChange.bind(this);
    this.handelChangeComplete = this.handelChangeComplete.bind(this);
    this.handleDropdownChange = this.handleDropdownChange.bind(this);
  }

  handleSliderChange(value) {
    // this.setState({ value: value });
    this.props.handleSliderChange(value);
  }
  handleDropdownChange(selectedOption) {
    // this.setState({ selectedOption });
    this.props.handleDropdownChange(selectedOption);
    // make Api call
  }

  handelChangeComplete() {
    // make api call to fetch data
    this.props.handelChangeComplete();

  }

  render() {
    const { value, selectedOption } = this.props;
    return(
      <div className={styles.slider}>
        <div className={styles.amountValue}>${value}</div>
        <Slider
          min={500}
          max={5000}
          value={value}
          labels={Labels}
          onChange={this.handleSliderChange}
          onChangeComplete={this.handelChangeComplete}
        />
        <div className="dropdown">
          <Select
            value={selectedOption}
            onChange={this.handleDropdownChange}
            options={options}
            className={styles.selector}
          />
        </div>
      </div>
    );
  }
}

AmountSlider.propTypes = {
  handleSliderChange: PropTypes.func,
  handleDropdownChange: PropTypes.func,
  handelChangeComplete: PropTypes.func,
  value: PropTypes.number,
  selectedOption: PropTypes.object
};

export default AmountSlider;
