import * as React from "react";
import T from 'i18n-react';
import { WidgetProps } from "@talentsoft-opensource/integration-widget-contract";
import { ExpenseStatus } from './expense-status';

import '../asset/widget.less';

interface Expenses {
    object: string,
    type: string,
    state: ExpenseStatus,
    amount: string
}

interface ExpenseState {
    data: Expenses[];
}

interface EnlargedWidgetProps {
    widgetProps: WidgetProps;
    languagePack: any;
}

export class EnlargedWidget extends React.Component<EnlargedWidgetProps, ExpenseState> {
    constructor(props: EnlargedWidgetProps) {
        super(props);
        this.state = { data: [] };
    }

    private async getData() {
        const {widgetProps} = this.props;

        const response = await widgetProps.myTSHostService.requestExternalResource({verb: 'GET', url: 'https://mockurl/api/enlarged'} );
        let data = [];
        data = JSON.parse(response.body);

        const expenses = data as Expenses[];
        this.setState({ data: expenses });

        widgetProps.myTSHostService.setDataIsLoaded();
    }

    public componentDidMount() {
        this.getData().catch((r) => {
            this.props.widgetProps.myTSHostService.raiseError("could not load data", "ERR_SERVICE", r);
        });
    }

    getExpenseType(status: ExpenseStatus): string {
        if (status === ExpenseStatus.Pending)
            return 'partner-expense-status-pending';
        else if (status === ExpenseStatus.WaitingForValidation)
            return 'partner-expense-status-waiting-for-validation';
        else if (status === ExpenseStatus.Validated)
            return 'partner-expense-status-validated';

        return '';
    }

    render() {
        T.setTexts(this.props.languagePack);

        const expenses = this.state.data.map((e, index) => {
            return (
                <tr key={index}>
                    <td>{e.object}</td>
                    <td>{e.type}</td>
                    <td>{<T.span text={this.getExpenseType(e.state)} />}</td>
                    <td>{e.amount}</td>
                    <td>
                        <i className="icon-delete color--ruban" />
                    </td>
                </tr>
            );
        })

        return (
            <div className="widget__enlarged__container">
                <div className="widget__enlarged__wrapper">
                    <table className="widget-enlarged-table">
                        <thead>
                            <tr>
                                <th>{<T.span text="partner-expense-object" />}</th>
                                <th>{<T.span text="partner-expense-type" />}</th>
                                <th>{<T.span text="partner-expense-state" />}</th>
                                <th>{<T.span text="partner-expense-amount" />}</th>
                                <th>{<T.span text="partner-expense-cancel" />}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {expenses}
                        </tbody>                        
                    </table>
                </div>
            </div>
        );
    }
}