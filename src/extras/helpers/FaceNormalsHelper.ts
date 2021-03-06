import { Matrix3 } from "../../math/Matrix3";
import { Vector3 } from "../../math/Vector3";
import { LineSegments } from "../../objects/LineSegments";
import { LineBasicMaterial } from "../../materials/LineBasicMaterial";
import { Float32Attribute } from "../../core/BufferAttribute";
import { Geometry } from "../../core/Geometry";
import { BufferGeometry } from "../../core/BufferGeometry";
import { Object3D } from "../../core/Object3D";
/**
 * @author mrdoob / http://mrdoob.com/
 * @author WestLangley / http://github.com/WestLangley
*/
export class FaceNormalsHelper extends LineSegments {
  object: Object3D;
  size: number;
  constructor(object: Object3D, size: number = 1, color: number = 0xffff00, linewidth: number = 1) {
    // FaceNormalsHelper only supports THREE.Geometry
    ///this.object = object;
    ///this.size = (size !== undefined) ? size : 1;
    //
    let nNormals = 0;
    let objGeometry = object.geometry;
    if ((objGeometry && objGeometry instanceof Geometry)) {
      nNormals = objGeometry.faces.length;
    } else {
      console.warn('THREE.FaceNormalsHelper: only THREE.Geometry is supported. Use THREE.VertexNormalsHelper, instead.');
    }
    //
    let geometry = new BufferGeometry();
    let positions = Float32Attribute(nNormals * 2 * 3, 3);
    geometry.addAttribute('position', positions);
    super(geometry, new LineBasicMaterial({ color: color, linewidth: linewidth }));
    //
    this.object = object;
    this.size = size;
    this.matrixAutoUpdate = false;
    this.update();
  }
  update() {
    let v1 = new Vector3();
    let v2 = new Vector3();
    let normalMatrix = new Matrix3();
    //return function update() {
      this.object.updateMatrixWorld(true);
      normalMatrix.getNormalMatrix(this.object.matrixWorld);
      let matrixWorld = this.object.matrixWorld;
      let position = (this.geometry as BufferGeometry).attributes.position;
      //
      let objGeometry = this.object.geometry;
      let vertices = (objGeometry as Geometry).vertices;
      let faces = (objGeometry as Geometry).faces;
      let idx = 0;
      for (let i = 0, l = faces.length; i < l; i ++) {
        let face = faces[i];
        let normal = face.normal;
        v1.copy(vertices[face.a])
          .add(vertices[face.b])
          .add(vertices[face.c])
          .divideScalar(3)
          .applyMatrix4(matrixWorld);
        v2.copy(normal).applyMatrix3(normalMatrix).normalize().multiplyScalar(this.size).add(v1);
        position.setXYZ(idx, v1.x, v1.y, v1.z);
        idx = idx + 1;
        position.setXYZ(idx, v2.x, v2.y, v2.z);
        idx = idx + 1;
      }
      position.needsUpdate = true;
      return this;
    //};
  }
}
