import { Material, MaterialParameters } from './Material';
import { MultiplyOperation } from '../constants';
import { Color } from '../math/Color';
import { Texture } from '../textures/Texture';
import { CubeTexture } from '../textures/CubeTexture';
/**
 * @author mrdoob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 *
 * parameters = {
 *  color: <hex>,
 *  opacity: <float>,
 *  map: new THREE.Texture(<Image>),
 *
 *  aoMap: new THREE.Texture(<Image>),
 *  aoMapIntensity: <float>
 *
 *  specularMap: new THREE.Texture(<Image>),
 *
 *  alphaMap: new THREE.Texture(<Image>),
 *
 *  envMap: new THREE.TextureCube([posx, negx, posy, negy, posz, negz]),
 *  combine: THREE.Multiply,
 *  reflectivity: <float>,
 *  refractionRatio: <float>,
 *
 *  shading: THREE.SmoothShading,
 *  depthTest: <bool>,
 *  depthWrite: <bool>,
 *
 *  wireframe: <boolean>,
 *  wireframeLinewidth: <float>,
 *
 *  skinning: <bool>,
 *  morphTargets: <bool>
 * }
 */
export interface MeshBasicMaterialParameters extends MaterialParameters {
  color?: number;
  opacity?: number;
  map?: Texture;

  aoMap?: Texture;
  aoMapIntensity?: number;

  specularMap?: Texture;

  alphaMap?: Texture;

  envMap?: CubeTexture;
  combine?: number;
  reflectivity?: number;
  refractionRatio?: number;

  shading?: number;
  depthTest?: boolean;
  depthWrite?: boolean;

  wireframe?: boolean;
  wireframeLinewidth?: number;

  skinning?: boolean;
  morphTargets?: boolean;
}
export class MeshBasicMaterial extends Material {
  aoMap: Texture;
  aoMapIntensity: number;
  combine: number;
  refractionRatio: number;
  readonly isMeshBasicMaterial: boolean = true;
  constructor(parameters?: MeshBasicMaterialParameters | MaterialParameters) {
    super();
    this.type = 'MeshBasicMaterial';
    this.color = new Color(0xffffff); // emissive
    this.map = null;
    this.aoMap = null;
    this.aoMapIntensity = 1.0;
    this.specularMap = null;
    this.alphaMap = null;
    this.envMap = null;
    this.combine = MultiplyOperation;
    this.reflectivity = 1;
    this.refractionRatio = 0.98;
    this.wireframe = false;
    this.wireframeLinewidth = 1;
    this.wireframeLinecap = 'round';
    this.wireframeLinejoin = 'round';
    this.skinning = false;
    this.morphTargets = false;
    this.lights = false;
    this.setValues(parameters);
  }
  copy(source: this): this {
    super.copy(source);
    this.color.copy(source.color);
    this.map = source.map;
    this.aoMap = source.aoMap;
    this.aoMapIntensity = source.aoMapIntensity;
    this.specularMap = source.specularMap;
    this.alphaMap = source.alphaMap;
    this.envMap = source.envMap;
    this.combine = source.combine;
    this.reflectivity = source.reflectivity;
    this.refractionRatio = source.refractionRatio;
    this.wireframe = source.wireframe;
    this.wireframeLinewidth = source.wireframeLinewidth;
    this.wireframeLinecap = source.wireframeLinecap;
    this.wireframeLinejoin = source.wireframeLinejoin;
    this.skinning = source.skinning;
    this.morphTargets = source.morphTargets;
    return this;
  }
}