import * as React from "react";
import T from 'i18n-react';
import * as highcharts from 'highcharts'

// this import will only work with the typescript options
// esModuleInterop & allowSyntheticDefaultImports
import HighchartsReact from "highcharts-react-official";

import { WidgetProps } from "@talentsoft-opensource/integration-widget-contract"

import { uxpTheme, standardColors } from './theme'

import '../asset/widget.less';

import * as en from '../resources/en-gb.json'
import * as fr from '../resources/fr-fr.json'
const languagePacks = {
    'en-gb': en,
    'fr-fr': fr
}

type Language = keyof typeof languagePacks;
type LanguagePack = typeof en.labels;

const DEFAULT_LANGUAGE: Language = 'en-gb';

highcharts.setOptions(uxpTheme);

function getPointsPresentationData(languagePack: LanguagePack): { [id: string]: {name: string, color: string} } {
    return {
        'ToDo': {
            name: languagePack["partner-serie-tocomplete"],
            color: standardColors.purple
        },
        'InProgress': {
            name: languagePack["partner-serie-invalidation"],
            color: standardColors.lightBlue
        },
        'ToValidate': {
            name: languagePack["partner-serie-tovalidate"],
            color: standardColors.lightGrey
        },
        'Validated': {
            name: languagePack["partner-serie-validated"],
            color: standardColors.orange
        },
    };
}


export class Widget extends React.Component<WidgetProps, {data: highcharts.DataPoint[]}> {
    constructor(props: WidgetProps) {
        super(props);
        this.state = { data: [] };

        this.defineActionHeaders();
    }

    private async getData() {
        const {myTSHostService} = this.props;
        const response = await  myTSHostService.requestExternalResource({verb: 'GET', url: 'https://mockurl/api'} );
        let data = JSON.parse(response.body);
        const valuePoints = data as highcharts.DataPoint[];
        this.setState({ data: valuePoints });
        myTSHostService.setDataIsLoaded();
    }

    private setTextsOrDefault() {
        T.setTexts(this.getLanguagePack());
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

    private getOptions(languagePack: LanguagePack): highcharts.Options {
        return {
            series: [
                {
                    type: "pie",
                    name: 'MyStatsGraphTooltip',
                    innerSize: '50%',
                    cursor: 'default',
                }
            ],
            title: {
                text: '',
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
    }

    defineActionHeaders() {
        const {myTSHostService} = this.props;
        // Set to true to define your widget as enlargeable
        myTSHostService.setHeaderActionConfiguration({
            enlargeable: true,
            customActions: {
                addAction: () => { /* add click reaction */ },
                searchAction: () => { /* search click reaction */ }
            }
        });
    }

    public componentDidMount() {
        this.getData()
            .catch((r) => {
                this.props.myTSHostService.raiseError("could not load data", "ERR_SERVICE");
            });
    }

    public render() {
        this.setTextsOrDefault();
        const languagePack = this.getLanguagePack();
        const presentation = getPointsPresentationData(languagePack);
        const expenseData = this.state.data.map(p => {
            const newPoint = {...p};
            if (newPoint.id) {
                newPoint.name = presentation[newPoint.id].name;
                newPoint.color = presentation[newPoint.id].color;
            }
            return newPoint;
        });
        const options = this.getOptions(languagePack);
        options.series![0].data = expenseData
        return (
            <div className="widget__container">
                <div className="widget__wrapper">
                    <T.span text="partner-title" className="widget-title" />
                    <T.span
                        text={{key:"partner-from-to", start:'2018-6-15', end:"2018-12-15"}}
                        className="widget-subtitle" />
                    <HighchartsReact
                        highcharts={highcharts}
                        options={options}
                    />
                </div>
            </div>
        );
    }
}
