import React from 'react';
import axios from 'axios';
import * as styles from './style.scss';
import Slider from './slider';

class Home extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: 500,
      selectedOption: null,
      amountPerMonth: 0,
      error: false
    };
    this.renderDetailsDisplay = this.renderDetailsDisplay.bind(this);
    this.handleSliderChange = this.handleSliderChange.bind(this);
    this.handelChangeComplete = this.handelChangeComplete.bind(this);
    this.handleDropdownChange = this.handleDropdownChange.bind(this);
    this.callApi = this.callApi.bind(this);
    this.renderTotalPayableAmount = this.renderTotalPayableAmount.bind(this);
    this.renderError = this.renderError.bind(this);
  }

  componentDidMount() {
    // make APi call to show initial data
    axios({
      method: 'get',
      url: '/interest?amount=500&numMonths=6'
    }).then(res => {
      this.setState({ amountPerMonth: res.data.monthlyPayment.amount });
    });
  }

  renderError() {
    return(
      <div className={styles.error}>
        <span style={{ color: '#dc4f4fcf'}}>You need to select the month duration</span>
      </div>
    );
  }

  callApi() {
    const { selectedOption, value } = this.state;
    if(selectedOption !== null) {
      axios({
        method: 'get',
        url: `/interest?amount=${value}&numMonths=${selectedOption.value}`
      }).then(res => {
        this.setState({ amountPerMonth: res.data.monthlyPayment.amount });
      });
    } else {
      this.setState({ error: true });
    }
  }

  handleSliderChange(value) {
    this.setState({ value: value });
  }
  handleDropdownChange(selectedOption) {
    this.setState({ selectedOption: selectedOption, error: false }, () => this.callApi());
  }

  handelChangeComplete() {
    // make api call to fetch data
    this.callApi();

  }

  renderDetailsDisplay(){
    const { amountPerMonth, selectedOption } = this.state;
    return (
      <div className={styles.detailDisplay}>
        <div className={styles.card}>
          <span style={{fontSize: '10px', paddingBottom: '10px'}}>PAY IT BACK OVER</span>
          <span style={{ fontSize: '20px'}}>{ selectedOption ===null ? '4 months' : selectedOption.value + 'months'}</span>
        </div>
        <div className={`${styles.card} ${styles.lastcard}`}>
          <span style={{ fontSize: '10px', paddingBottom: '10px'}}>MONTHLY PAYMENT</span>
          <span style={{ fontSize: '20px'}}>${amountPerMonth}</span>
        </div>
      </div>
    );
  }

  renderTotalPayableAmount() {
    const { amountPerMonth, selectedOption } = this.state;
    let totalPayableAmount = 0;
    if(selectedOption !== null && amountPerMonth !== 0) {
      totalPayableAmount = amountPerMonth*selectedOption.value;
    } else {
      totalPayableAmount = amountPerMonth*6;
    }
    return (
      <div className={styles.totalPayable}>
        <span style={{ textAlign: 'center'}}>Total Paybale Amount</span>
        <span className={styles.totalAmount}>${totalPayableAmount}</span>
      </div>
    );
  }

  render() {
    const { value, selectedOption, amountPerMonth, error } = this.state;
    return(
      <div className="home">
        { error ? this.renderError() : null}
        <Slider
          value={value}
          selectedOption={selectedOption}
          handelChangeComplete={this.handelChangeComplete}
          handleDropdownChange={this.handleDropdownChange}
          handleSliderChange={this.handleSliderChange}
        />
        {this.renderDetailsDisplay()}
        {amountPerMonth ? this.renderTotalPayableAmount() : null}
      </div>
    );
  }
}

export default Home;
