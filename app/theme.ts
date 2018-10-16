import { GlobalOptions, numberFormat } from 'highcharts'

export const uxpTheme: GlobalOptions = {
    chart: {
        backgroundColor: 'none',
        spacingBottom: 0,
        spacingTop: 0
    },
    title: {
        y: 20,
        style: { 'color': '#333333', 'fontSize': '18px' }
    },
    plotOptions: {
        pie: {
            showInLegend: true, // allow to see a legend below the graph
            animation: {
                duration: 500
            },
            cursor: 'pointer',
            dataLabels: {
                enabled: true,
                distance: -25,
                formatter: function (this: {y: number, point: { z: number}}) {
                    if (this.y == 0) {
                        return '';
                    }

                    return `${numberFormat(this.y, 0, ',', ' ')} - ${numberFormat(this.point.z, 0, ',', ' ')}€`;
                },
                shadow: {
                    opacity: 0.05,
                    width: 0.4
                },
                align: 'center',
                style: {
                    color: '#FFFFFF',
                    fontSize: '0.8em',
                    fontWeight: 'normal',
                    fontFamily: 'robotoregular',
                }
            }
        }
    },
    credits: {
        enabled: false
    },
    legend: {
        itemStyle: {
            color: '#5D5D5D',
            fontWeight: 'normal'
        },
        itemHoverStyle: {
            color: '#000000'
        },
        itemHiddenStyle: {
            color: '#cacaca'
        },
        itemMarginTop: 0,
        itemMarginBottom: 12,
        margin: 60, // Space between chart and legend
        padding: 20,
        symbolRadius: 50,
        symbolHeight: 20,
        symbolWidth: 20,
        verticalAlign: 'bottom',
        align: 'center',
        floating: false,
        width: 370
    }
};

export const standardColors = {
    lightBlue: '#57BFDF',
    lightGrey: '#E0E0E0',
    blue: '#0D518C',
    red: '#FF0000',
    orange: '#F28907',
    green: '#54A62E',
    purple: '#7C3F8C',
    black: '#000000',
    transparent: 'transparent'
};