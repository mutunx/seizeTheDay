import React, {useEffect} from 'react';
import { Image, Link, Stack, StackDivider, Text} from "@chakra-ui/react";
import {ExternalLinkIcon} from "@chakra-ui/icons";

function MostViewedPages() {

    const [mostViewedPages, setMostViewedPages] = React.useState([]);
    function getFaviconUrl(url) {
        const urlObj = new URL(url);
        return `${urlObj.protocol}//${urlObj.hostname}/favicon.ico`;
    }

    useEffect(()=> {
        chrome.topSites.get((mostViewedPages) => {
            setMostViewedPages(mostViewedPages);
        })
    },[])
    return (
        <Stack w={'30%'} divider={<StackDivider />} spacing='1'>
            {mostViewedPages && mostViewedPages.map(site =>
                <Link key={site.url} href={site.url} display={'flex'} flexDirection={'row'}>
                    <Image w={'18px'} alignSelf={'center'} height={'18px'} mr={'.2rem'} src={getFaviconUrl(site.url)} />
                    <Text fontSize='lg'>
                        {site.title}<ExternalLinkIcon mx='2px' />
                    </Text>
                </Link>
            )}
        </Stack>
    );
}

export default MostViewedPages;
