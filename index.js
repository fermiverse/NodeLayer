import { CompositeLayer } from '@deck.gl/core';
import { ScatterplotLayer } from '@deck.gl/layers';
import { TextLayer } from '@deck.gl/layers';

function getTextSize(d) {
    const { cluster, point_count } = d.properties ?? {};
    if (!cluster) return 0;
    const m = Math.ceil(Math.log10(point_count));
    return 20 * Math.sqrt(m);
}

function getCircleRadius(d) {
    return 0.8 * getTextSize(d);
}

export default class NodeLayer extends CompositeLayer {
    renderLayers() {
        const { 
            id, 
            getText,
            getTextSize,
            getTextAngle,
            getTextAnchor,
            getTextAlignmentBaseline,
            getTextColor,

            getCircleRadius,
            getCircleFillColor,

            units,
            billboard,
            getPosition, 
            pickable, 
            data
        } = this.props;
        
        return [
            new ScatterplotLayer({
                id: `${id}__circle`,
                data,
                pickable,
                getPosition,
                getRadius: getCircleRadius,
                radiusUnits: 'pixels',
                getFillColor: getCircleFillColor,
                radiusUnits: units
            }),
            new TextLayer({
                id: `${id}__text`,
                data,
                pickable,
                getPosition,
                getText,
                getSize: getTextSize,
                getAngle: getTextAngle,
                getTextAnchor,
                getAlignmentBaseline: getTextAlignmentBaseline,
                getColor: getTextColor,
                sizeUnits: units,
                billboard
            }),
        ];
    }
}

NodeLayer.defaultProps = {
    id: 'nodelayer',

    getText: d => d.properties.label,
    getTextSize,
    getTextAngle: 0,
    getTextAnchor: 'middle',
    getTextAlignmentBaseline: 'center',
    getTextColor: [255, 255, 255, 250],

    getCircleRadius,
    getCircleFillColor: [54, 164, 255, 250],

    getPosition: d => d.geometry.coordinates, 
    pickable: true, 
    units: 'pixels',
    billboard: false
};