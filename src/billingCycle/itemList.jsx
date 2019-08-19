import React, { Component } from "react";
import { Field, arrayInsert, arrayRemove } from "redux-form";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import Grid from "../common/layout/grid";
import Inputs from "../common/form/input";
import If from "../common/operador/if";

class itemList extends Component {
  add(index, item = {}) {
    if (!this.props.readOnly) {
      this.props.arrayInsert("billingCycleForm", this.props.field, index, item);
    }
  }
  remove(index, item = {}) {
    if (!this.props.readOnly && this.props.list.length > 1) {
      this.props.arrayRemove("billingCycleForm", this.props.field, index);
    }
  }
  renderRows() {
    const list = this.props.list || [];
    return list.map((item, index) => (
      <tr key={index}>
        <td>
          <Field
            name={`${this.props.field}[${index}].name`}
            component={Inputs}
            placeholder="Informe o Nome"
            readOnly={this.props.readOnly}
          />
        </td>
        <td>
          <Field
            name={`${this.props.field}[${index}].value`}
            component={Inputs}
            placeholder="Informe o Valor"
            readOnly={this.props.readOnly}
          />
          <If test={this.props.showStatus}>
            <Field
              name={`${this.props.field}[${index}].status`}
              component={Inputs}
              placeholder="Status"
              readOnly={this.props.readOnly}
            />
          </If>
        </td>
        <td>
          <button
            type="button"
            className="btn btn-success"
            onClick={() => this.add(index + 1)}
          >
            <i className="fa fa-plus" />
          </button>
          <button
            type="button"
            className="btn btn-warning"
            onClick={() => this.add(index + 1, item)}
          >
            <i className="fa fa-clone" />
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => this.remove(index)}
          >
            <i className="fa fa-trash-o" />
          </button>
        </td>
      </tr>
    ));
  }
  render() {
    return (
      <Grid cols={this.props.cols}>
        <fieldset>
          <legend>{this.props.legend}</legend>
          <table className="table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Valor</th>
                <If test={this.props.showStatus}>
                  <th>Status</th>
                </If>
                <th className="table-actions">Ações</th>
              </tr>
            </thead>
            <tbody>{this.renderRows()}</tbody>
          </table>
        </fieldset>
      </Grid>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ arrayInsert, arrayRemove }, dispatch);
export default connect(
  null,
  mapDispatchToProps
)(itemList);
