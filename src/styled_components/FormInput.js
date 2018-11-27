import React, {Component} from 'react';
import cx from 'classnames';

export default class FormInput extends Component {
	render() {
		const {
			classNames,
			label,
			onChange,
			value,
			type
		} = this.props

		return (
			<div className={cx('form-input', classNames)}>
				<span>{label}</span>
				{{
					text: <input type='text' value={value} onChange={onChange} />,
					password: <input type='password' value={value} onChange={onChange} />,
				}[type]}
				
			</div>
		);
	}
}