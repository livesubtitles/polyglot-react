import * as React from 'react';

export interface StatefulComponentProps {
    dummyProp: string;
}

interface StatefulComponentState {
    dummyStateField: number;
}

export class StatefulComponent extends React.Component<StatefulComponentProps, StatefulComponentState> {
    constructor(props: StatefulComponentProps) {
        super(props);
        this.state = {
            dummyStateField: 2
        };
    }

    render() {
        return (
            <div>
                <p>
                    Stateful Component
                </p>
            </div>
        );
    }

}