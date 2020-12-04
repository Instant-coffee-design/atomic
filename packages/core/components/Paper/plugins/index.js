import { Heading, Bold, Blockquote, Image, History, Italic, OrderedList, BulletList, ListItem } from 'tiptap-extensions'
import { LinkExtension, LinkMenu } from './Link'
import { StyledBlockExtension, StyledBlockMenu } from './StyledBlock'

export default {
    menu: {
        link: LinkMenu,
        styledBlock: StyledBlockMenu
    },
    plugins: () => {
        
        return [ new Heading({ levels: [1, 2, 3] }), new Bold(), new Italic(), new OrderedList(), new BulletList(), new ListItem(), new Blockquote(), new Image(), new History(), new LinkExtension(), new StyledBlockExtension() ]
    }
}