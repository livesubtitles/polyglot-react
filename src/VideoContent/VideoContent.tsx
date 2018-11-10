import * as React from 'react';

export interface VideoContentProps {
    mediaURL: string;
}

export class VideoContent extends React.Component<VideoContentProps, {}> {
    constructor(props: VideoContentProps) {
        super(props);
    }

    render() {
        return (
            <div>
                <p>Stateful Component</p>
            </div>
        );
    }

}
