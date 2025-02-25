import {describe, beforeEach, it, expect} from "vitest"
import * as pureimage from "../src/index"

describe('drawImage',() => {
    let image;
    let context;
    let src;

    beforeEach(() => {
        image = pureimage.make(200,200)
        context = image.getContext('2d')

        src = pureimage.make(50,50)
        const c = src.getContext('2d')
        c.fillStyle = 'white'
        c.fillRect(0,0,50,50)
        c.fillStyle = 'black'
        c.fillRect(25,0,25,50)
    })

    it('canvas is empty and clear', () => {
        expect(image.getPixelRGBA(0,0)).to.eq(0x000000FF)
    })

    it('can draw a full image', () => {
        context.drawImage(src,0,0,50,50,0,0,50,50)
        expect(image.getPixelRGBA(0, 0)).to.eq(0xFFFFFFFF)
        expect(image.getPixelRGBA(25,0)).to.eq(0x000000FF)
    })

    it('can stretch a full image', () => {
        context.drawImage(src,0,0,50,50,0,0,200,200)
        expect(image.getPixelRGBA(0, 0)).to.eq(0xFFFFFFFF)
        expect(image.getPixelRGBA(25,0)).to.eq(0xFFFFFFFF)
        expect(image.getPixelRGBA(100,0)).to.eq(0x000000FF)
        expect(image.getPixelRGBA(199,0)).to.eq(0x000000FF)
    })

    it('can draw a plain image',() => {
        context.drawImage(src,0,0)
        expect(image.getPixelRGBA(0, 0)).to.eq(0xFFFFFFFF)
        expect(image.getPixelRGBA(25,0)).to.eq(0x000000FF)
    })

    it('can draw a scaled image',() => {
        context.drawImage(src,0,0,200,200)
        expect(image.getPixelRGBA(0, 0)).to.eq(0xFFFFFFFF)
        expect(image.getPixelRGBA(100,0)).to.eq(0x000000FF)
    })
})
