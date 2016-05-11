import React from 'react';
import Formsy from 'formsy-react';

  const MyOwnInput = React.createClass({

    // Add the Formsy Mixin
    mixins: [Formsy.Mixin],

    // setValue() will set the value of the component, which in
    // turn will validate it and the rest of the form
    changeValue(event) {
      this.setValue(event.currentTarget.value);
    },

    render() {
      // Set a specific className based on the validation
      // state of this component. showRequired() is true
      // when the value is empty and the required prop is
      // passed to the input. showError() is true when the
      // value typed is invalid
      const className = this.showRequired() ? 'required' : this.showError() ? 'error' : null;

      // An error message is returned ONLY if the component is invalid
      // or the server has returned an error message
      const errorMessage = this.getErrorMessage();

      return (
        <div className={className}>
          <label htmlFor={this.props.name}>{this.props.name}</label>
          <input type="text" onChange={this.changeValue} value={this.getValue()}/>
          <span>{this.props.tips}</span>
          <span className="validation-error">{errorMessage}</span>
        </div>
      );
    }
  })
const App = React.createClass({
    getInitialState() {
      return {
        canSubmit: false
      }
    },
    enableButton() {
      this.setState({
        canSubmit: true
      });
    },
    disableButton() {
      this.setState({
        canSubmit: false
      });
    },
    submit(model) {
      someDep.saveEmail(model.email);
    },
    render() {
      return (
        <Formsy.Form onValidSubmit={this.submit} onValid={this.enableButton} onInvalid={this.disableButton}>
          <MyOwnInput name="姓名：" type="text" validations={{matchRegexp:/\S+/}}  validationError="请填入姓名" required/>
          <label htmlFor="学院">所在学院：</label>
          <select defaultValue="C">
              <option value="A">光电</option>
              <option value="B">体育</option>
              <option value="C">生物</option>
              <option value="D">自动化</option>
              <option value="E">法学院</option>
              <option value="F">计算机</option>
              <option value="G">经管</option>
              <option value="H">传媒</option>
              <option value="I">外国语</option>
              <option value="J">软件</option>
              <option value="K">通信</option>
            </select>
          <MyOwnInput name="学号：" type="text" validations={{
          	matchRegexp:/\d{10}/
          }}  validationError="学号位数错误" required/>
          <MyOwnInput name="所在组织：" tips="(所在组织无，则填写“无”)" type="text" validations={{matchRegexp:/\S+/}} validationError="请填写"/>
          <MyOwnInput name="意愿社团：" type="text"  validations={{matchRegexp:/\S+/}} validationError="请填入意愿社团" required/>
          <MyOwnInput name="意向职务：" type="text"  validations={{matchRegexp:/\S+/}} validationError="请填入意向职务" required/>
          <MyOwnInput name="联系方式：" type="text" validations={{
          	matchRegexp: /1[3|5|7|8]\d{9}/
          }} validationError="这不是个正确的电话号码" required/>
          <button className="buttons" type="submit" disabled={!this.state.canSubmit}>Submit</button>
        </Formsy.Form>
      );
    }
  });

export default App;