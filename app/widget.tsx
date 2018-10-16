import * as React from "react";
import T from 'i18n-react';
import * as highcharts from 'highcharts'
import { WidgetProps } from "@talentsoft-opensource/integration-widget-contract"
import HighchartsReact from "highcharts-react-official";

import * as en from '../resources/en-gb.json'
import * as fr from '../resources/fr-fr.json'
import { uxpTheme, standardColors } from './theme'

import '../asset/widget.less';

const languagePacks = {
    'en-gb': en,
    'fr-fr': fr
}

type Language = keyof typeof languagePacks;

const DEFAULT_LANGUAGE: Language = 'en-gb';

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
        T.setTexts(this.getLanguagePack());
        return this.getLanguage();
    }

    private getLanguage(): Language {
        let language: string = this.props.language;
        if (!(language in languagePacks)) {
            language = DEFAULT_LANGUAGE;
        }
        return language as Language;
    }

    private getLanguagePack() {
        return languagePacks[this.getLanguage()].labels;
    }

    public render() {
        this.setTextsOrDefault();
        const languagePack = this.getLanguagePack();
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
                            name: languagePack["partner-serie-tocomplete"],
                            color: standardColors.purple,
                            y: 12,
                            z: 2458
                        },
                        {
                            id: 'InProgress',
                            name: languagePack["partner-serie-invalidation"],
                            color: standardColors.lightBlue,
                            y: 5,
                            z: 3874
                        },
                        {
                            id: 'ToValidate',
                            name: languagePack["partner-serie-tovalidate"],
                            color: standardColors.lightGrey,
                            y: 7,
                            z: 2375
                        },
                        {
                            id: 'Validated',
                            name: languagePack["partner-serie-validated"],
                            color: standardColors.orange,
                            y: 18,
                            z: 129
                        },
                    ],
                }
            ],
            title: {
                text: '' //languagePack["partner-title"]
            },
            tooltip: {
                pointFormat: languagePack["partner-tooltip"],
                outside: true
            },
            chart: {
                width: 370,
                height: 400
            }
        };
        return (
            <div className="widget__container">
                <div className="widget__wrapper">
                    <T.span text="partner-title" className="widget-title" />
                    <T.span text={{key:"partner-from-to", start:'2018-6-15', end:"2018-12-15"}} className="widget-subtitle" />
                    <HighchartsReact
                        highcharts={highcharts}
                        options={options}
                    />
                </div>
            </div>
        );
    }
}
