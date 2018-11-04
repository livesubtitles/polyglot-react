import * as React from 'react'

export interface StatelessComponentProps {
    dummyField: string;
}

export const StatelessComponent = (props: StatelessComponentProps) => {
    return (
        <div>
            <p>StatelessComponent</p>
        </div>
    );
}

