import * as React from "react";
import T from 'i18n-react';
import * as highcharts from 'highcharts'
import { WidgetProps } from "@talentsoft-opensource/integration-widget-contract"
import HighchartsReact from "highcharts-react-official";

import * as en from '../resources/en-gb.json'
import * as fr from '../resources/fr-fr.json'
import { uxpTheme, standardColors } from './theme'

const languagePacks = {
    'en-gb': en,
    'fr-fr': fr
}

const DEFAULT_LANGUAGE = 'en-gb';

highcharts.setOptions(uxpTheme);

export class Widget extends React.Component<WidgetProps, {}> {
    constructor(props: WidgetProps) {
        super(props);
    }

    getData() {
        const {myTSHostService} = this.props;
        myTSHostService.setDataIsLoaded();
    }

    public componentDidMount() {
        this.getData();
    }


    setTextsOrDefault = () => {
        let language: string = this.props.language;

        if (!(language in languagePacks)) {
        } else {
            language = DEFAULT_LANGUAGE;
        }

        T.setTexts(languagePacks[language as (keyof typeof languagePacks)])
        return language;
    }

    public render() {
        this.setTextsOrDefault();
        const options: highcharts.Options = {
            series: [
                {
                    type: "pie",
                    name: 'MyStatsGraphTooltip',
                    innerSize: '50%',
                    cursor: 'default',
                    data: [
                        {
                            id: 'ToDo',
                            name: 'ToDo',
                            color: standardColors.blue,
                            y: 12
                        },
                        {
                            id: 'InProgress',
                            name: 'InProgress',
                            color: standardColors.red,
                            y: 5
                        },
                        {
                            id: 'Submitted',
                            name: 'Submitted',
                            color: standardColors.green,
                            y: 18
                        },
                    ],
                }
            ],
            title: {
                text: ""
            },
        };
        return (
            <div className="widget__container">
                <div className="widget__wrapper">
                    <HighchartsReact
                        highcharts={highcharts}
                        options={options}
                    />
                </div>
            </div>
        );
    }
}
