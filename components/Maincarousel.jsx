import React from 'react';
import {Box, Typography, IconButton, useMediaQuery} from '@mui/material';
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import {Carousel} from 'react-responsive-carousel';
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext"

  // import all image from assets folder
  const importAll = (r) => 
    r.keys().reduce((acc, item) => {
    acc[item.replace("./", "")] = r(item);
    return acc;
  }, {});

  const heroTextureImports = importAll (
    require.context("../public/images/assets", false, /\.(png|jpe?g|svg)$/)
  );

function MainCarousel() {
  const isNonMobile = useMediaQuery("min-width:600px");

  return (
    <Carousel
      infiniteLoop={true}
      showThumbs={false}
      showIndicators={false}
      showStatus={false}
      renderArrowPrev={(onClickHandler, hasPrev, label) => (
        <IconButton
          onClick={onClickHandler}
          sx={{
            position: 'absolute',
            top: '50%',
            left: '0',
            color: '#000000',
            padding: '5px',
            zIndex: '10'
          }}
        >
          <NavigateBeforeIcon 
            sx={{
              fontSize: '40',
              color: '#000000'
            }} 
          />
        </IconButton>
      )}

      renderArrowNext = {(onClickHandler, hasNext, label) => (
        <IconButton
          onClick={onClickHandler}
          sx={{
            position: 'absolute',
            top: '50%',
            right: '0',
            color: '#000000',
            padding: '5px',
            zIndex: '10',
          }}
        >
          <NavigateNextIcon sx={{fontSize: 40 }} />
        </IconButton>
      )}
    >
      {Object.values(heroTextureImports).map((texture, index) => (
        <Box key={`carousel-image-${index}`}
          sx={{
            border: '1px solid #000000'
          }}
        >
          <img 
            src={texture}
            alt={`{carousel-${index}}`}
            style={{
              width: '100%',
              height:'350px',
              objectFit: 'cover',
              backgroundAttachment: 'fixed',
            }}
          />

          {/* <Box 
            color='#000000'
            padding= '20px'
            borderRadius="1px"
            textAlign='left'
            backgroundColor="rgba(0,0,0,.4)"
            position="absolute"
            top="46%"
            left={isNonMobile ? '10%' : '0'}
            right={isNonMobile ? 'undefined' : '0'}
            margin={isNonMobile ? 'undefined' : '0 auto'}
            maxWidth={isNonMobile ? 'undefined' : '240px'}
          >
            Monkey
          </Box> */}
        </Box>
      ))}
    </Carousel>
  )
}

export default MainCarousel