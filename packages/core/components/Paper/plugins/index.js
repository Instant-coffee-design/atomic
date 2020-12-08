import { Heading, Bold, Image, History, Italic, OrderedList, BulletList, ListItem } from 'tiptap-extensions'
import { LinkExtension, LinkMenu } from './Link'
import { ImageExtension, ImageMenu } from './Image'
import { StyledBlockExtension, StyledBlockMenu } from './StyledBlock'

export default {
    menu: {
        link: LinkMenu,
        styledBlock: StyledBlockMenu,
        image: ImageMenu
    },
    plugins: () => {
        
        return [ new Heading({ levels: [1, 2, 3] }), new Bold(), new Italic(), new OrderedList(), new BulletList(), new ListItem(), new ImageExtension(), new History(), new LinkExtension(), new StyledBlockExtension() ]
    }
}